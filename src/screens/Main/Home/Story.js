import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import StoryComponent from '../../../components/home/Story';
import { veryLargeText } from '../../../theme/fonts';

const Story = ({ navigation }) => {
  const { stories } = useSelector((state) => state.home);

  return (
    <View style={styles.storyContainer}>
      <Text style={styles.storyLabel}>Stories</Text>
      <FlatList
        data={stories.filter((v) => v.sys.contentType?.sys?.id === 'article')}
        renderItem={({ item, index }) => (
          <StoryComponent item={item} index={index} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  storyLabel: {
    ...veryLargeText,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 43,
    paddingLeft: 30,
  },
  storyContainer: {
    marginBottom: 41,
  },
  contentContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
