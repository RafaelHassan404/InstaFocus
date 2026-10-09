import { Text } from 'react-native';

export function formatMs(ms: number): string {
  const total = Math.ceil(Math.max(0, ms) / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function CountdownTimer({ ms, size = 48 }: { ms: number; size?: number }) {
  return <Text style={{ fontSize: size, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{formatMs(ms)}</Text>;
}