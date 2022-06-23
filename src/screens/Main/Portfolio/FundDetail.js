import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native';

import Header from '../../../components/common/Header';
import StickyHeader from '../../../components/common/StickyHeader';
import Loading from '../../../components/common/Loading';
import FundDetailsComponent from '../../../components/home/FundDetails';
import { homeActions } from '../../../actions/home';
import { WHITE400, BLACK100 } from '../../../theme/colors';
import { normalText, veryLargeText } from '../../../theme/fonts';
import BulbSvg from '../../../assets/icons/home/Bulb-icon.svg';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const FundDetail = ({ navigation, route }) => {
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState('1y');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { stockDetails, timeSeries, isStockDetailsLoading, selectedStock } =
    useSelector((state) => state.home);

  useEffect(() => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    dispatch(
      homeActions.getStockDetailsRequest({
        cusip: route.params?.cusip || 921937819,
        token,
      }),
    );
    getTimeSeries();
  }, [route]);

  useEffect(() => {
    getTimeSeries();
  }, [duration]);

  const getTimeSeries = () => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    dispatch(
      homeActions.getTimeSeriesRequest({
        cusip: route.params?.cusip || 921937819,
        interval: duration,
        token,
      }),
    );
  };

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
        rightIcon={<BulbSvg />}
        onPressLeft={goBack}
        containerStyle={styles.headerContainer}
        centerIcon={
          <View style={styles.header}>
            <Text style={styles.title}>Fund detail</Text>
            <Text style={styles.description}>
              {selectedStock?.strategyName}
            </Text>
          </View>
        }
        rightStyle={styles.rightStyle}
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
        rightIcon={<BulbSvg />}
        onPressLeft={goBack}
        rightStyle={styles.headerStickyRight}
        centerIcon={
          <View style={styles.headerSticky}>
            <Text style={styles.title}>{selectedStock?.strategyName}</Text>
          </View>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderStickyHeader()}
      <View style={styles.contentArea}>
        {isStockDetailsLoading && <Loading />}
        <FlatList
          data={['']}
          renderItem={() => (
            <FundDetailsComponent
              stockDetails={stockDetails}
              selectedStock={selectedStock}
              setDuration={(val) => setDuration(val)}
              duration={duration}
              data={timeSeries}
            />
          )}
          keyExtractor={(item, index) => index}
          onScroll={(e) => setPosition(e.nativeEvent.contentOffset.y)}
          nestedScrollEnabled
        />
      </View>
    </SafeAreaView>
  );
};

export default FundDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  headerStickyRight: {
    paddingTop: 13,
    paddingBottom: 22,
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
    marginTop: 12,
  },
  headerSticky: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightStyle: {
    paddingVertical: 0,
    paddingLeft: 28,
  },
  title: {
    ...normalText,
    color: BLACK100,
  },
  description: {
    ...veryLargeText,
    fontWeight: '600',
    color: BLACK100,
    marginTop: 5,
  },
  contentArea: {
    flex: 1,
  },
});
