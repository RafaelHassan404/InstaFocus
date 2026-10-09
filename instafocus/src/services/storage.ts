import Storage from 'expo-sqlite/kv-store';

export type Settings = {
  dailyAllowanceMin: number;
  maxSessionMin: number;
};

export type TimerState = {
  dayKey: string;
  usedMs: number; // finished sessions today
  sessionStart: number | null;
  sessionEnd: number | null;
};

export const DEFAULT_SETTINGS: Settings = { dailyAllowanceMin: 15, maxSessionMin: 5 };

const SETTINGS_KEY = 'settings';
const TIMER_KEY = 'timer';

export function todayKey(now: number = Date.now()): string {
  const d = new Date(now);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function freshTimer(now: number = Date.now()): TimerState {
  return { dayKey: todayKey(now), usedMs: 0, sessionStart: null, sessionEnd: null };
}

export async function loadSettings(): Promise<Settings> {
  try {
    const raw = await Storage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(s: Settings): Promise<void> {
  await Storage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

export async function loadTimer(): Promise<TimerState> {
  try {
    const raw = await Storage.getItem(TIMER_KEY);
    return raw ? { ...freshTimer(), ...JSON.parse(raw) } : freshTimer();
  } catch {
    return freshTimer();
  }
}

export async function saveTimer(t: TimerState): Promise<void> {
  await Storage.setItem(TIMER_KEY, JSON.stringify(t));
}