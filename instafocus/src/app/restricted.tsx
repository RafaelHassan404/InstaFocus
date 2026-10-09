import { useCallback } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import CountdownTimer, { formatMs } from '../components/CountdownTimer';
import { useRestrictedTimer } from '../hooks/useRestrictedTimer';

// Finite placeholder items: restricted content is a short list, never an endless feed.
const ITEMS = ['Reel from alex', 'Reel from sara', 'Reel from omar', 'Reel from lina', 'Reel from zain'];

export default function RestrictedScreen() {
  const { ready, active, sessionRemainingMs, allowanceLeftMs, settings, unlock, lockNow, refresh } =
    useRestrictedTimer();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  if (!ready) return <ActivityIndicator style={{ marginTop: 40 }} />;

  if (active) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#dfe6e9' }}>
          <Text style={{ color: '#636e72' }}>Time left in this session</Text>
          <CountdownTimer ms={sessionRemainingMs} size={40} />
          <Pressable onPress={lockNow} style={{ marginTop: 8, padding: 8 }}>
            <Text style={{ color: '#d63031', fontWeight: '600' }}>Lock now</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
          {ITEMS.map((t) => (
            <View key={t} style={{ height: 120, borderRadius: 12, backgroundColor: '#dfe6e9', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{t}</Text>
            </View>
          ))}
          <Text style={{ textAlign: 'center', color: '#636e72' }}>That's all for now.</Text>
        </ScrollView>
      </View>
    );
  }

  const exhausted = allowanceLeftMs <= 0;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>{exhausted ? 'Done for today' : 'Locked'}</Text>
      <Text style={{ marginTop: 8, textAlign: 'center', color: '#636e72' }}>
        {exhausted
          ? 'Your daily allowance is used up. It resets tomorrow.'
          : `Allowance left today: ${formatMs(allowanceLeftMs)}\nEach unlock lasts up to ${settings.maxSessionMin} min.`}
      </Text>
      {!exhausted && (
        <Pressable
          onPress={unlock}
          style={{ marginTop: 24, backgroundColor: '#0984e3', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Unlock</Text>
        </Pressable>
      )}
    </View>
  );
}