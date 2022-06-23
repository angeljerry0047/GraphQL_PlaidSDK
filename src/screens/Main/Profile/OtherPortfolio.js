import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';

import AppContainer from '../../../components/common/AppContainer';
import Header from '../../../components/common/Header';
import StickyHeader from '../../../components/common/StickyHeader';
import Bottom from '../../../components/common/Bottom';
import OtherPortfolioComponent from '../../../components/home/OtherPortfolio';
import { modelsSelector } from '../../../selectors/portfolio';
import { portfolioActions } from '../../../actions/portfolio';
import { homeActions } from '../../../actions/home';
import {
  WHITE,
  WHITE400,
  BLACK100,
  BLUE100,
  GREY300,
  BLACK200,
} from '../../../theme/colors';
import {
  normalBoldText,
  normalText,
  veryLargeText,
} from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

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
        router: 'TransferHome',
      }),
    );
  };

  const handleFundDetail = (val) => {
    let cusip;
    if (val.label.includes('Large company')) {
      cusip = 922908637;
    } else if (val.label.includes('Medium company')) {
      cusip = 922908629;
    } else if (val.label.includes('Small company')) {
      cusip = 922908751;
    } else if (val.label.includes('International company')) {
      cusip = 921909768;
    } else if (val.label.includes('Intermediate term')) {
      cusip = 921937819;
    } else if (val.label.includes('short term')) {
      cusip = 921937827;
    } else {
      cusip = 922908637;
    }
    dispatch(homeActions.setStock(val));
    navigation.navigate('FundDetail', { cusip });
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
        rightIcon={<View />}
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
        <OtherPortfolioComponent
          model={models.Moderate}
          listKey="moderate"
          onPress={handleFundDetail}
        />
        <OtherPortfolioComponent
          model={models.Aggressive}
          listKey="aggressive"
          onPress={handleFundDetail}
        />
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
      <AppContainer style={styles.appContainer}>
        {route.params.currentPortfolio === headers[selectedIndex] ? (
          <Bottom hidden>
            <Text style={styles.currentPortfolio}>
              This is your current portfolio
            </Text>
          </Bottom>
        ) : (
          <Bottom
            label="Change to this portfolio"
            onPress={handleSelectPortfolio}
            isLoading={isLoading}
          />
        )}
      </AppContainer>
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
    marginTop: 80,
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
  title: {
    ...normalText,
    color: BLACK100,
    marginTop: 9,
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
  currentPortfolio: {
    ...normalBoldText,
    color: BLACK200,
    textAlign: 'center',
  },
  stickyTitle: {
    ...normalText,
    color: BLACK100,
  },
  stickyHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
