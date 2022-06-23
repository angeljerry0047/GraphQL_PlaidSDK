import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { XAxis, StackedBarChart } from 'react-native-svg-charts';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Control from '../../../components/profile/Control';
import {
  WHITE,
  WHITE400,
  BLACK100,
  BLACK200,
  BLUE200,
  GREEN400,
  GREY600,
  GREY700,
} from '../../../theme/colors';
import {
  veryLargeText,
  extraLargeText,
  verySmallText,
  extraSmallText,
  normalBoldText,
} from '../../../theme/fonts';

const axesSvg = {
  ...extraSmallText,
  fill: GREY600,
};
const C3 = 0.083;

const Protection = ({ route, navigation }) => {
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [year, setYear] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setMonthlyAmount(30);
    setYear(30);
  }, []);

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
  const renderItem = () => {
    return (
      <AppContainer>
        <View style={styles.container}>
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
            </>
          )}
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
        <View style={styles.controls}>
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
        <TouchableOpacity>
          <View style={styles.outlineBtn}>
            <Text style={styles.monthlyContribution}>
              Update monthly contribution
            </Text>
          </View>
        </TouchableOpacity>
      </AppContainer>
    );
  };

  return (
    <FlatList
      data={['']}
      keyExtractor={(item, index) => index}
      renderItem={renderItem}
      style={styles.flatList}
    />
  );
};

export default Protection;

const styles = StyleSheet.create({
  container: {
    paddingTop: 38,
    backgroundColor: WHITE400,
    alignItems: 'center',
  },
  header: {
    color: BLACK100,
    ...veryLargeText,
    fontWeight: '600',
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
    marginTop: 5,
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
  returnView: { marginLeft: 20 },

  contrlContainer: {
    marginTop: 57,
  },
  controls: {
    marginTop: 88,
  },
  flatList: {
    flex: 1,
    marginBottom: 40,
  },
  monthlyContribution: {
    ...normalBoldText,
    color: BLACK100,
  },
  outlineBtn: {
    paddingVertical: 13,
    paddingHorizontal: 33,
    backgroundColor: WHITE,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: GREY700,
    alignSelf: 'center',
  },
});
