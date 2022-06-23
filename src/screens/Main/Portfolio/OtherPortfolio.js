import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';

import Header from '../../../components/common/Header';
import StickyHeader from '../../../components/common/StickyHeader';
import Bottom from '../../../components/common/Bottom';
import OtherPortfolioComponent from '../../../components/home/OtherPortfolio';
import { modelsSelector } from '../../../selectors/portfolio';
import { homeActions } from '../../../actions/home';
import {
  WHITE,
  WHITE400,
  BLACK100,
  BLUE100,
  GREY300,
  GREY800,
  BLACK200,
  WHITE200,
} from '../../../theme/colors';
import {
  normalBoldText,
  normalText,
  veryLargeText,
} from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import BulbSvg from '../../../assets/icons/home/Bulb-icon.svg';

const OtherPortfolio = ({ route, navigation }) => {
  const headers = ['Balanced', 'Moderate', 'Aggressive'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const models = useSelector(modelsSelector);
  const { isLoading } = useSelector((state) => state.portfolio);

  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  };

  const onIndexChanged = (index) => {
    setSelectedIndex(index);
  };

  const handleSelectPortfolio = () => {
    navigation.navigate('ChangeReview', {
      newPortfolio: headers[selectedIndex],
      currentPortfolio: route?.params?.currentPortfolio,
    });
  };

  const handleFundDetail = (val) => {
    dispatch(homeActions.setStock(val));
    navigation.navigate('FundDetail', { cusip: val.cusip });
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
        rightIcon={<BulbSvg />}
        rightStyle={styles.right}
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
          <View style={styles.header}>
            <Text style={styles.stickyTitle}>
              {headers[selectedIndex]} portfolio
            </Text>
          </View>
        }
        rightIcon={<BulbSvg />}
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
        <OtherPortfolioComponent
          model={models.Balanced}
          listKey="balanced"
          onPress={handleFundDetail}
        />
        {(route?.params?.currentPortfolio === 'Moderate' ||
          route?.params?.currentPortfolio === 'Aggressive') && (
          <OtherPortfolioComponent
            model={models.Moderate}
            listKey="moderate"
            onPress={handleFundDetail}
          />
        )}
        {route?.params?.currentPortfolio === 'Aggressive' && (
          <OtherPortfolioComponent
            model={models.Aggressive}
            listKey="aggressive"
            onPress={handleFundDetail}
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
      />
      <View style={styles.appContainer}>
        {route.params.currentPortfolio === headers[selectedIndex] ? (
          <Bottom hidden buttonWithKeyboardAwayStyle={styles.bottom}>
            <Text style={styles.currentPortfolio}>
              This is your current portfolio
            </Text>
          </Bottom>
        ) : (
          <Bottom
            label="Change to this portfolio"
            onPress={handleSelectPortfolio}
            isLoading={isLoading}
            buttonWithKeyboardAwayStyle={styles.bottom}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OtherPortfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  appContainer: {
    paddingTop: 50,
    backgroundColor: WHITE,
    position: 'relative',
  },
  bottom: {
    backgroundColor: WHITE,
    paddingTop: 20,
    borderTopColor: WHITE200,
    borderTopWidth: 1,
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
    paddingTop: 10,
    marginBottom: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
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
  currentPortfolio: {
    ...normalBoldText,
    color: BLACK200,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GREY800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 28,
  },
});
