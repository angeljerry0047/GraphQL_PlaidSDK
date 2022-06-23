import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { XAxis, StackedBarChart } from 'react-native-svg-charts';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import Header from '../../components/common/Header';
import StickyHeader from '../../components/common/StickyHeader';
import Title from '../../components/common/Title';
import Bottom from '../../components/common/Bottom';
import Description from '../../components/common/Description';
import Control from '../../components/profile/Control';
import {
  WHITE,
  BLACK100,
  BLACK200,
  BLUE200,
  BLUE100,
  GREEN400,
  GREY500,
  GREY600,
  WHITE200,
} from '../../theme/colors';
import {
  veryLargeText,
  extraLargeText,
  verySmallText,
  extraSmallText,
  normalText,
} from '../../theme/fonts';
import { statusActions } from '../../actions/status';

const axesSvg = {
  ...extraSmallText,
  fill: GREY600,
  translateY: 5,
};
const C3 = 0.083;

const HistoricalView = ({ route, navigation }) => {
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [year, setYear] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [position, setPosition] = useState(0);
  const [navigatedFromContributionScreen, setNavigatedFromWContributionScreen] =
    useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setMonthlyAmount(30);
    setYear(30);
  }, []);

  useEffect(() => {
    setNavigatedFromWContributionScreen(route.params?.from === 'contribution');
  }, [route]);

  const xAxis = useMemo(() => {
    let data = [];
    if (year === 5) {
      data = [1, 2, 3, 4, 5];
    }
    if (year === 10) {
      data = [1, 2, 4, 6, 8, 10];
    }
    if (year === 15) {
      data = [1, 3, 5, 7, 9, 11, 13, 15];
    }
    if (year === 20) {
      data = [1, 4, 8, 12, 16, 20];
    }
    if (year === 25) {
      data = [1, 5, 10, 15, 20, 25];
    }

    if (year === 30) {
      data = [1, 5, 10, 15, 20, 25, 30];
    }
    if (year === 35) {
      data = [1, 5, 10, 15, 20, 25, 30, 35];
    }

    return data;
  }, [year]);

  const prices = useMemo(() => {
    let totalPrice = 0;
    let investment = 0;
    let returnedVal = 0;
    const data = [];
    for (let i = 1; i < year + 1; i++) {
      totalPrice = totalPrice * (1 + C3) + 12 * monthlyAmount;
      investment = monthlyAmount * 12 * i;
      returnedVal = totalPrice - investment;
      const temp = {
        year: year,
        investment: investment,
        returnedVal: returnedVal,
      };
      data.push(temp);
    }
    setChartData(data);
    return {
      totalPrice,
      investment,
      returnedVal,
    };
  }, [year, monthlyAmount]);

  const handleNextPage = () => {
    dispatch(
      statusActions.setAppCurrentStatus({
        parent: 'Portfolio',
        sub: 'Explain',
      }),
    );
    navigation.navigate('Explain');
  };

  const handleBackToContribution = () => {
    navigation.navigate('Contribution');
  };

  const handleMonthMinus = () => {
    if (monthlyAmount > 10 && monthlyAmount <= 100) {
      setMonthlyAmount(monthlyAmount - 10);
      return;
    }
    if (monthlyAmount > 100 && monthlyAmount <= 500) {
      setMonthlyAmount(monthlyAmount - 50);
    }
    return;
  };

  const handleMonthPlus = () => {
    if (monthlyAmount < 100) {
      setMonthlyAmount(monthlyAmount + 10);
      return;
    }
    if (monthlyAmount >= 100 && monthlyAmount < 500) {
      setMonthlyAmount(monthlyAmount + 50);
      return;
    }
    return;
  };

  const handleYearPlus = () => {
    if (year < 35) {
      setYear(year + 5);
    }
    return;
  };

  const handleYearMinus = () => {
    if (year > 5) {
      setYear(year - 5);
    }
    return;
  };

  const colors = [BLUE200, GREEN400];
  const keys = ['investment', 'returnedVal'];

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <Header
        centerIcon={<Text style={styles.header}>Your projected returns</Text>}
        containerStyle={styles.headerContainer}
      />
    );
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        centerIcon={
          <Text numberOfLines={1} style={styles.stickyTitle}>
            Your projected returns
          </Text>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <FlatList
        data={['']}
        keyExtractor={(item, index) => index}
        renderItem={() => (
          <View style={styles.content}>
            <Description
              style={styles.descriptionContainer}
              textStyle={styles.description}
              description="On average, the market has produced an 8.3% return every year for the last 30 years."
            />

            {prices && (
              <>
                <Title
                  label={`$${Number(prices.totalPrice).toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`}
                  textStyle={styles.totalPrice}
                />
                <View style={styles.amountWrapper}>
                  <View style={styles.amount}>
                    <View style={styles.investment} />
                    <Text style={styles.text}>
                      Invested: $
                      {prices.investment.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </Text>
                  </View>
                  <View style={[styles.amount, styles.returnView]}>
                    <View style={styles.return} />
                    <Text style={styles.text}>
                      Earned: $
                      {Number(prices.returnedVal).toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </Text>
                  </View>
                </View>
                <View style={styles.chartContainer}>
                  <StackedBarChart
                    style={[
                      styles.stackedBarChart,
                      {
                        height: (150 / 500 / 35) * monthlyAmount * year + 80,
                      },
                    ]}
                    colors={colors}
                    data={chartData}
                    keys={keys}
                    spacingInner={0.4}
                  />
                </View>
                <XAxis
                  data={xAxis}
                  formatLabel={(value, index) => xAxis[index]}
                  contentInset={{ left: 10, right: 10, top: 30, bottom: 30 }}
                  svg={axesSvg}
                  style={styles.xAxis}
                />
              </>
            )}
            <View style={styles.contrlContainer}>
              <Control
                label={`$${monthlyAmount}/month`}
                handleMinus={handleMonthMinus}
                handlePlus={handleMonthPlus}
              />
              <Control
                label={`${year} years`}
                handleMinus={handleYearMinus}
                handlePlus={handleYearPlus}
                style={styles.contrl}
              />
            </View>
          </View>
        )}
        onScroll={(e) => {
          setPosition(e.nativeEvent.contentOffset.y);
        }}
        listKey="other"
        ListHeaderComponent={renderHeader}
      />

      {navigatedFromContributionScreen ? (
        <Bottom
          label="Back"
          onPress={handleBackToContribution}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAway}
          buttonStyle={styles.backButtonStyle}
          buttonTextStyle={styles.backButtonTextStyle}
        />
      ) : (
        <Bottom
          label="Continue"
          onPress={handleNextPage}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAway}
        />
      )}
    </SafeAreaView>
  );
};

export default HistoricalView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  headerContainer: {
    marginTop: 12,
    paddingTop: 10,
    justifyContent: 'center',
  },
  header: {
    color: BLACK100,
    ...veryLargeText,
    fontWeight: '600',
  },
  descriptionContainer: {
    marginTop: 19,
    width: 280,
    alignSelf: 'center',
    marginBottom: 21,
  },
  description: {
    textAlign: 'center',
    ...verySmallText,
    letterSpacing: 0,
  },
  totalPrice: {
    textAlign: 'center',
    ...extraLargeText,
    color: BLACK100,
  },
  contrl: {
    marginTop: 20,
    marginBottom: 60,
  },
  chartContainer: {
    height: 230,
    marginTop: 30,
  },
  stackedBarChart: {
    minHeight: 80,
    maxHeight: 230,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  amountWrapper: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  investment: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BLUE200,
    marginRight: 6,
  },
  returnView: { marginLeft: 20 },
  return: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GREEN400,
    marginRight: 6,
  },
  text: {
    color: BLACK200,
    ...verySmallText,
    letterSpacing: 0,
  },
  xAxis: {
    marginTop: 13,
  },
  contrlContainer: {
    marginTop: 57,
  },
  buttonWithKeyboardAway: {
    position: 'relative',
    ...ifIphoneX(
      {},
      {
        borderTopColor: WHITE200,
        borderTopWidth: 1,
      },
    ),
  },
  content: {
    paddingHorizontal: 30,
  },
  stickyTitle: {
    ...normalText,
    color: BLACK100,
    width: 205,
    textAlign: 'center',
  },
  backButtonStyle: {
    backgroundColor: GREY500,
  },
  backButtonTextStyle: {
    color: BLUE100,
  },
});
