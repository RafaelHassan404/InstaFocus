import { FlatList, Text, View } from 'react-native';
import type { Story } from '../services/mockInstagramApi';

export default function StoryRow({ stories }: { stories: Story[] }) {
  return (
    <FlatList
      horizontal
      data={stories}
      keyExtractor={(s) => s.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 12, gap: 14 }}
      renderItem={({ item }) => (
        <View style={{ alignItems: 'center', width: 70 }}>
          <View
            style={{
              width: 66,
              height: 66,
              borderRadius: 33,
              borderWidth: 3,
              borderColor: item.seen ? '#b2bec3' : '#e84393',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                backgroundColor: item.color,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
                {item.username[0].toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={{ marginTop: 4, fontSize: 12 }} numberOfLines={1}>
            {item.username}
          </Text>
        </View>
      )}
    />
  );
}