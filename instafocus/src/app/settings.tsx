import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { DEFAULT_SETTINGS, Settings, loadSettings, saveSettings } from '../services/storage';

function Stepper(props: {
  label: string;
  value: number;
  step: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const { label, value, step, min, max, onChange } = props;
  const btn = { width: 44, height: 44, borderRadius: 22, backgroundColor: '#dfe6e9', alignItems: 'center', justifyContent: 'center' } as const;
  return (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#dfe6e9' }}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 8 }}>
        <Pressable style={btn} onPress={() => onChange(Math.max(min, value - step))}>
          <Text style={{ fontSize: 22 }}>−</Text>
        </Pressable>
        <Text style={{ fontSize: 24, fontWeight: '700', minWidth: 90, textAlign: 'center' }}>{value} min</Text>
        <Pressable style={btn} onPress={() => onChange(Math.min(max, value + step))}>
          <Text style={{ fontSize: 22 }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useFocusEffect(
    useCallback(() => {
      loadSettings().then(setSettings);
    }, [])
  );

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveSettings(next);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stepper label="Daily allowance" value={settings.dailyAllowanceMin} step={5} min={5} max={120}
        onChange={(v) => update({ dailyAllowanceMin: v })} />
      <Stepper label="Max session length" value={settings.maxSessionMin} step={1} min={1} max={30}
        onChange={(v) => update({ maxSessionMin: v })} />
      <Text style={{ padding: 16, color: '#636e72' }}>
        Changes apply the next time you unlock.
      </Text>
    </View>
  );
}