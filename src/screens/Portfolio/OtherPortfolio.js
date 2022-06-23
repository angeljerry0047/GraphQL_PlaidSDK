import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';

import Header from '../../components/common/Header';
import StickyHeader from '../../components/common/StickyHeader';
import Bottom from '../../components/common/Bottom';
import OtherPortfolioComponent from '../../components/profile/OtherPortfolio';
import {
  WHITE,
  WHITE200,
  BLACK100,
  BLUE100,
  GREY300,
} from '../../theme/colors';
import { normalText, veryLargeText } from '../../theme/fonts';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';
import { modelsSelector } from '../../selectors/portfolio';
import { statusActions } from '../../actions/status';
import { portfolioActions } from '../../actions/portfolio';

const OtherPortfolio = ({ route, navigation }) => {
  const headers = ['Balanced', 'Moderate', 'Aggressive'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const models = useSelector(modelsSelector);
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  };

  const onIndexChanged = (index) => {
    setSelectedIndex(index);
  };

  const handleSelectPortfolio = () => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    dispatch(
      portfolioActions.updatePortfolioRequest({
        modelId: models[headers[selectedIndex]].id,
        token,
        type: headers[selectedIndex],
        router: 'Contribution',
      }),
    );
    dispatch(
      statusActions.setAppCurrentStatus({
        parent: 'Portfolio',
        sub: 'Contribution',
      }),
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
        containerStyle={styles.headerContainer}
        centerIcon={
          <View style={styles.header}>
            <Text style={styles.title}>Portfolio types</Text>
            <Text style={styles.description}>{headers[selectedIndex]}</Text>
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
        centerIcon={
          <View style={styles.stickyHeader}>
            <Text style={styles.stickyTitle}>
              {headers[selectedIndex]} portfolio
            </Text>
          </View>
        }
      />
    );
  };

  const renderItem = () => {
    return (
      <Swiper
        showsButtons={false}
        loop={false}
        paginationStyle={styles.paginationStyle}
        dotColor={GREY300}
        activeDotColor={BLUE100}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        index={selectedIndex}
        onIndexChanged={onIndexChanged}>
        <OtherPortfolioComponent model={models.Balanced} listKey="balanced" />
        {(route?.params?.currentPortfolio === 'Moderate' ||
          route?.params?.currentPortfolio === 'Aggressive') && (
          <OtherPortfolioComponent model={models.Moderate} listKey="moderate" />
        )}
        {route?.params?.currentPortfolio === 'Aggressive' && (
          <OtherPortfolioComponent
            model={models.Aggressive}
            listKey="aggressive"
          />
        )}
      </Swiper>
    );
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
        listKey="other"
        style={styles.flatList}
      />
      <View style={styles.appContainer}>
        <Bottom
          label="Use this portfolio"
          onPress={handleSelectPortfolio}
          isLoading={isLoading}
          buttonWithKeyboardAwayStyle={styles.bottom}
        />
      </View>
    </SafeAreaView>
  );
};

export default OtherPortfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  paginationStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    alignItems: 'flex-start',
  },
  leftStyle: {
    paddingBottom: 24,
  },
  stickyTitle: {
    ...normalText,
    color: BLACK100,
  },
  title: {
    ...normalText,
    color: BLACK100,
    marginTop: 12,
  },
  description: {
    ...veryLargeText,
    fontWeight: '600',
    color: BLACK100,
    marginTop: 5,
  },
  headerContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingTop: 7,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingRight: 60,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4.5,
    marginLeft: 4.5,
  },
  activeDotStyle: {
    marginRight: 4.5,
    marginLeft: 4.5,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  appContainer: {
    paddingTop: 50,
    position: 'relative',
  },
  stickyHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: WHITE,
    paddingTop: 20,
    borderTopColor: WHITE200,
    borderTopWidth: 1,
  },
  flatList: {
    flex: 1,
  },
});
