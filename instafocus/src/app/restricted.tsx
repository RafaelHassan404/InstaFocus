import { Text, View } from 'react-native';

export default function RestrictedScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Locked</Text>
      <Text style={{ marginTop: 8, textAlign: 'center', color: '#636e72' }}>
        The timed unlock goes here in Phase 4.
      </Text>
    </View>
  );
}