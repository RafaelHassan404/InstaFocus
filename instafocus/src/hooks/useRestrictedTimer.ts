import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import {
  DEFAULT_SETTINGS,
  Settings,
  TimerState,
  loadSettings,
  loadTimer,
  saveTimer,
} from '../services/storage';
import {
  allowanceRemainingMs,
  isActive,
  settle,
  startSession,
  stopSession,
} from '../features/timer/timerLogic';

export function useRestrictedTimer() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [timer, setTimer] = useState<TimerState | null>(null);
  const [now, setNow] = useState(Date.now());
  const timerRef = useRef<TimerState | null>(null);

  const apply = useCallback((next: TimerState) => {
    timerRef.current = next;
    setTimer(next);
    saveTimer(next);
  }, []);

  const refresh = useCallback(async () => {
    const [s, t] = await Promise.all([loadSettings(), loadTimer()]);
    const nowMs = Date.now();
    setSettings(s);
    setNow(nowMs);
    apply(settle(t, nowMs));
  }, [apply]);

  // Tick every second; expiry is checked against the clock, not a counter.
  useEffect(() => {
    const id = setInterval(() => {
      const nowMs = Date.now();
      setNow(nowMs);
      const cur = timerRef.current;
      if (!cur) return;
      const next = settle(cur, nowMs);
      if (next !== cur) apply(next);
    }, 1000);
    return () => clearInterval(id);
  }, [apply]);

  // Recalculate when returning from the background.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') refresh();
    });
    return () => sub.remove();
  }, [refresh]);

  const unlock = useCallback(async () => {
    const s = await loadSettings();
    const cur = timerRef.current;
    if (!cur) return;
    setSettings(s);
    apply(startSession(cur, s, Date.now()));
  }, [apply]);

  const lockNow = useCallback(() => {
    const cur = timerRef.current;
    if (!cur) return;
    apply(stopSession(cur, Date.now()));
  }, [apply]);

  const ready = timer !== null;
  const active = timer ? isActive(timer, now) : false;
  const sessionRemainingMs = active && timer?.sessionEnd ? timer.sessionEnd - now : 0;
  const allowanceLeftMs = timer ? allowanceRemainingMs(timer, settings, now) : 0;

  return { ready, active, sessionRemainingMs, allowanceLeftMs, settings, unlock, lockNow, refresh };
}