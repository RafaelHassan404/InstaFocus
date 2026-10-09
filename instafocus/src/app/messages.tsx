import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { getConversations, type Conversation } from '../services/mockInstagramApi';

export default function MessagesScreen() {
  const [items, setItems] = useState<Conversation[] | null>(null);

  useEffect(() => {
    getConversations().then(setItems);
  }, []);

  if (!items) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(c) => c.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#dfe6e9' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: item.unread ? '700' : '500', fontSize: 16 }}>
              {item.username}
            </Text>
            <Text style={{ color: '#636e72' }}>{item.time}</Text>
          </View>
          <Text
            numberOfLines={1}
            style={{ color: item.unread ? '#000' : '#636e72', marginTop: 4 }}>
            {item.lastMessage}
          </Text>
        </View>
      )}
    />
  );
}