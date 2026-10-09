import { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import StoryRow from '../components/StoryRow';
import { getStories, type Story } from '../services/mockInstagramApi';

export default function StoriesScreen() {
  const [stories, setStories] = useState<Story[] | null>(null);

  useEffect(() => {
    getStories().then(setStories);
  }, []);

  if (!stories) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StoryRow stories={stories} />
      <Text style={{ textAlign: 'center', marginTop: 24, color: '#636e72' }}>
        That's everyone. Nothing else to scroll.
      </Text>
    </View>
  );
}