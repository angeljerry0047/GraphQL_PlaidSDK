import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Header from '../../../components/common/Header';
import StickyHeader from '../../../components/common/StickyHeader';
import { WHITE400, BLACK100, GREY100, BLUE200 } from '../../../theme/colors';
import { normalText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import ValueToday from './ValueToday';
import Protection from './Protection';

const TABS = {
  today: 'Value today',
  projection: 'Projection',
};

const PortfolioValue = ({ navigation, route }) => {
  const [position, setPosition] = useState(0);

  const tabInitialState = route.params?.tab ?? 'today';
  const [currentTab, setCurrentTab] = useState(tabInitialState);

  const goBack = () => {
    navigation.goBack();
  };

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.headerContainer}
        centerIcon={
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentTab('today')}>
              <View
                style={[
                  styles.tab,
                  currentTab === 'today' && styles.activeTab,
                ]}>
                <Text
                  style={[
                    styles.title,
                    currentTab === 'today' && styles.activeTab,
                  ]}>
                  Value today
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentTab('projection')}>
              <View
                style={[
                  styles.tab,
                  styles.projection,
                  currentTab === 'projection' && styles.activeTab,
                ]}>
                <Text
                  style={[
                    styles.title,
                    currentTab === 'projection' && styles.activeTab,
                  ]}>
                  Projection
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      />
    );
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.headerStickyContainer}
        centerIcon={
          <View style={styles.headerSticky}>
            <Text style={[styles.title, styles.activeTab]}>
              {TABS[currentTab]}
            </Text>
          </View>
        }
      />
    );
  };

  const renderItem = () => {
    if (currentTab === 'today') {
      return <ValueToday navigation={navigation} />;
    }
    return <Protection navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <FlatList
        data={['']}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        onScroll={(e) => setPosition(e.nativeEvent.contentOffset.y)}
        ListHeaderComponent={renderHeader}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

export default PortfolioValue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  headerStickyContainer: {
    alignItems: 'flex-start',
  },
  headerSticky: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'flex-start',
    paddingTop: 10,
    marginBottom: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
    paddingRight: 60,
  },
  title: {
    ...normalText,
    color: GREY100,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    color: BLACK100,
    borderBottomWidth: 2,
    borderBottomColor: BLUE200,
    transform: [{ translateY: 0 }],
  },
  projection: {
    marginLeft: 30,
  },
  tab: {
    paddingBottom: 5,
    transform: [{ translateY: -1 }],
  },
  flatList: { flex: 1 },
  buttonWithKeyboardAwayStyle: {
    position: 'relative',
  },
});
