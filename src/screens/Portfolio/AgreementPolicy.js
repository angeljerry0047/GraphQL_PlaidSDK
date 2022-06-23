import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';

import AppContainer from '../../components/common/AppContainer';
import Header from '../../components/common/Header';
import StickyHeader from '../../components/common/StickyHeader';
import { WHITE, BLACK100, BLUE100 } from '../../theme/colors';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';
import { normalText, primaryFont, extraLargeText } from '../../theme/fonts';

const SelectedProfile = ({ route, navigation }) => {
  const [position, setPosition] = useState(0);
  const { agreementPolicy } = useSelector((state) => state.portfolio);

  const goBack = () => {
    navigation.goBack();
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        centerIcon={
          <View style={styles.header}>
            <Text style={styles.stickyTitle}>
              {route.params?.type.replace('_', ' ')}
            </Text>
          </View>
        }
      />
    );
  };

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <Header
        leftIcon={<ArrowBackSvg />}
        leftStyle={styles.leftStyle}
        onPressLeft={goBack}
      />
    );
  };

  const renderItem = () => {
    return (
      <AppContainer style={styles.appContainer}>
        <Markdown
          markdownit={MarkdownIt({ typographer: true }).disable([
            'link',
            'image',
          ])}
          style={markdownStyles}>
          {agreementPolicy}
        </Markdown>
      </AppContainer>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <FlatList
        data={['']}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        onScroll={(e) => setPosition(e.nativeEvent.contentOffset.y)}
        nestedScrollEnabled
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default SelectedProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  appContainer: {
    marginTop: 3,
  },
  headerContainer: {
    alignItems: 'center',
  },
  stickyHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: BLUE100,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyTitle: {
    ...normalText,
    color: BLACK100,
    textTransform: 'capitalize',
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    fontFamily: primaryFont,
    color: BLACK100,
  },
  heading1: {
    ...extraLargeText,
  },
});
