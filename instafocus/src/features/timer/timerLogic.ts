import { Settings, TimerState, freshTimer, todayKey } from '../../services/storage';

const MIN = 60 * 1000;

// Ends an expired session, charges it to today's usage, and handles day changes.
// Returns the same object if nothing changed.
export function settle(state: TimerState, now: number): TimerState {
  let s = state;
  const { sessionStart, sessionEnd } = s;
  if (sessionStart !== null && sessionEnd !== null && (now < sessionStart || now >= sessionEnd)) {
    // now < sessionStart means the clock was moved back: charge the full session.
    s = { ...s, usedMs: s.usedMs + (sessionEnd - sessionStart), sessionStart: null, sessionEnd: null };
  }
  if (s.dayKey !== todayKey(now) && s.sessionStart === null) {
    s = freshTimer(now);
  }
  return s;
}

export function isActive(s: TimerState, now: number): boolean {
  return s.sessionStart !== null && s.sessionEnd !== null && now >= s.sessionStart && now < s.sessionEnd;
}

export function allowanceRemainingMs(s: TimerState, settings: Settings, now: number): number {
  let running = 0;
  if (s.sessionStart !== null && s.sessionEnd !== null) {
    running = Math.max(0, Math.min(now, s.sessionEnd) - s.sessionStart);
  }
  return Math.max(0, settings.dailyAllowanceMin * MIN - s.usedMs - running);
}

export function startSession(state: TimerState, settings: Settings, now: number): TimerState {
  const s = settle(state, now);
  if (isActive(s, now)) return s;
  const remaining = settings.dailyAllowanceMin * MIN - s.usedMs;
  if (remaining <= 0) return s;
  const length = Math.min(settings.maxSessionMin * MIN, remaining);
  return { ...s, sessionStart: now, sessionEnd: now + length };
}

// Ends the session early and charges only the time actually used.
export function stopSession(state: TimerState, now: number): TimerState {
  const { sessionStart, sessionEnd } = state;
  if (sessionStart === null || sessionEnd === null) return state;
  const elapsed = now < sessionStart ? sessionEnd - sessionStart : Math.min(now, sessionEnd) - sessionStart;
  return { ...state, usedMs: state.usedMs + elapsed, sessionStart: null, sessionEnd: null };
}