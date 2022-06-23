import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import BalanceChart from '../../../components/home/BalanceChart';
import Portfolio from './Portfolio';
import {
  WHITE,
  WHITE400,
  BLACK100,
  GREEN400,
  GREEN800,
  RED300,
  RED400,
  BLUE100,
  GREY700,
  BLACK200,
  GREEN1100,
  GREEN1300,
} from '../../../theme/colors';
import { smallText, verySmallText, mediumText } from '../../../theme/fonts';
import GraphChartSvg from '../../../assets/icons/home/Graph-Chart-icon.svg';

const { width } = Dimensions.get('screen');
const CONTROLS = ['1W', '1M', '6M', '1Y', 'ALL'];

const ValueToday = ({ navigation }) => {
  const { apexBalance } = useSelector((state) => state.portfolio);
  const [duration, setDuration] = useState('ALL');
  const durationText = useMemo(() => {
    switch (duration) {
      case '1W':
        return '1 week';
      case '1M':
        return '1 month';
      case '6M':
        return '6 months';
      case '1Y':
        return '1 year';
      default:
        return '1 week';
    }
  }, [duration]);

  const chartData = useMemo(() => {
    const data = apexBalance?.graphData?.[duration]?.data.map(
      (v) => v.totalEquity,
    );
    let balanceDiff = `+$${Number(
      apexBalance?.graphData?.[duration]?.diff || 0,
    ).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    if (apexBalance?.graphData?.[duration]?.diff < 0) {
      balanceDiff = `-$${Math.abs(
        apexBalance?.graphData?.[duration]?.diff,
      ).toFixed(2)}`;
    }
    return {
      data: data || [],
      balanceDiff: balanceDiff,
      percentDiff: apexBalance?.graphData?.[duration].percentDiff.toFixed(2),
    };
  }, [apexBalance, duration]);

  const renderItem = () => {
    return (
      <>
        <View style={styles.chartContainer}>
          {chartData.data.length === 0 ? (
            <View style={styles.noChartContainer}>
              <View style={styles.graphChart}>
                <GraphChartSvg />
              </View>
              <Text style={styles.noChart}>
                Invest for {durationText} to see a graph
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.apexBalance}>
                <Title
                  label={`$${Number(apexBalance?.balance || 0).toLocaleString(
                    'en-US',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  )}`}
                />
                <Text
                  style={
                    chartData?.percentDiff > 0 ? styles.plus : styles.minus
                  }>
                  {chartData.balanceDiff} {`(${chartData.percentDiff}%)`}
                </Text>
              </View>
              <BalanceChart
                style={styles.chartStyle}
                data={chartData.data}
                lineColor={chartData?.percentDiff > 0 ? GREEN1100 : RED400}
                gradientStartColor={
                  chartData?.percentDiff > 0 ? GREEN400 : RED400
                }
                gradientStartOpacity={chartData?.percentDiff > 0 ? 0.2 : 0.1}
              />
            </>
          )}

          <View style={styles.contrlContainer}>
            {CONTROLS.map((control) => (
              <TouchableOpacity
                onPress={() => setDuration(control)}
                key={control}>
                <View
                  style={[
                    styles.button,
                    control === duration && styles.selectedButton,
                  ]}>
                  <Text
                    style={[
                      styles.buttonTxt,
                      control === duration && styles.selectedTxt,
                    ]}>
                    {control === 'ALL' ? 'All' : control}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <AppContainer flatList>
            <Portfolio navigation={navigation} isVisible={true} />
          </AppContainer>
        </View>
      </>
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

export default ValueToday;

const styles = StyleSheet.create({
  chartContainer: {
    paddingTop: 38,
    backgroundColor: WHITE400,
    alignItems: 'center',
  },
  chartStyle: {
    height: 150,
    width: width,
    marginTop: 20,
  },
  apexBalance: {
    marginBottom: 51,
    alignItems: 'center',
  },
  plus: {
    color: GREEN1300,
    ...verySmallText,
    marginTop: 5,
  },
  minus: {
    color: RED300,
    ...verySmallText,
    marginTop: 5,
  },

  contrlContainer: {
    flexDirection: 'row',
    marginTop: 90,
    marginBottom: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: GREEN800,
    padding: 3,
    width: width - 60,
    backgroundColor: WHITE,
  },
  selectedButton: {
    backgroundColor: BLUE100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 1,
    shadowColor: BLACK100,
    shadowOpacity: 0.15,
  },
  button: {
    backgroundColor: WHITE,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 21,
    paddingVertical: 11,
    marginHorizontal: 1.5,
    width: (width - 82) / 5,
    borderRadius: 100,
  },
  selectedTxt: {
    color: WHITE,
    opacity: 1,
  },
  buttonTxt: {
    ...mediumText,
    fontWeight: '600',
    color: BLACK100,
    textAlign: 'center',
    width: 22,
  },
  noChartContainer: {
    alignItems: 'center',
    marginBottom: 58,
    marginTop: 91,
  },
  graphChart: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: GREY700,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  noChart: {
    width: 130,
    color: BLACK200,
    ...smallText,
    textAlign: 'center',
  },
  flatList: {
    flex: 1,
    marginBottom: 40,
  },
});
