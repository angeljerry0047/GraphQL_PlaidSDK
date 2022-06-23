import React, { useMemo, useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';

import Header from '../../../components/common/Header';
import {
  BLACK100,
  BLACK200,
  WHITE,
  WHITE200,
  WHITE400,
  GREEN400,
} from '../../../theme/colors';
import { normalText, normalBoldText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import Loading from '../../../components/common/Loading';
import Article from '../../../components/home/Article';
import StickyHeader from '../../../components/common/StickyHeader';

const ContentfulArticle = ({ navigation, route }) => {
  const [position, setPosition] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { stories, storyLoading } = useSelector((state) => state.home);

  useEffect(() => {
    setSelectedIndex(route.params?.selectedIndex);
  }, [route]);

  const goBack = () => {
    navigation.goBack();
  };

  const articles = useMemo(() => {
    return stories.filter((v) => v.sys.contentType?.sys?.id === 'article');
  }, [stories]);

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.header}
      />
    );
  };

  const stickHeaderLabel = useMemo(() => {
    const label = articles[selectedIndex]?.fields?.title;
    return label;
  }, [articles, selectedIndex]);

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        centerIcon={
          <Text numberOfLines={1} style={styles.stickyTitle}>
            {stickHeaderLabel}
          </Text>
        }
      />
    );
  };

  const percent = useMemo(() => {
    return Math.min(
      100,
      Math.floor((position / Math.abs(frameHeight - contentHeight)) * 100),
    );
  }, [frameHeight, contentHeight, position]);

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      {storyLoading ? (
        <Loading />
      ) : (
        <>
          <FlatList
            data={['']}
            keyExtractor={(item, index) => index}
            renderItem={() => <Article article={articles[selectedIndex]} />}
            onScroll={(e) => {
              setPosition(e.nativeEvent.contentOffset.y);
            }}
            listKey="other"
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.flatContent}
            onContentSizeChange={(width, height) => setContentHeight(height)}
            onLayout={(event) =>
              setFrameHeight(event.nativeEvent.layout.height)
            }
          />
          <View style={[styles.process, { width: `${percent}%` }]} />
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() =>
                setSelectedIndex((index) => (index >= 1 ? index - 1 : index))
              }>
              <Text style={styles.label}>{'< Previous'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setSelectedIndex((index) =>
                  index < articles.length - 1 ? index + 1 : index,
                )
              }>
              <Text style={styles.label}>{'Next >'}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ContentfulArticle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  stickyTitle: {
    ...normalText,
    color: BLACK100,
    width: 205,
    textAlign: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    height: 91,
    borderTopColor: WHITE200,
    borderTopWidth: 1,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    width: '100%',
  },
  label: {
    ...normalBoldText,
    color: BLACK200,
    paddingTop: 20,
    paddingBottom: 16,
  },
  flatContent: { paddingBottom: 100 },
  process: {
    position: 'absolute',
    bottom: 92,
    backgroundColor: GREEN400,
    height: 2,
  },
  header: {
    paddingTop: 10,
  },
});
