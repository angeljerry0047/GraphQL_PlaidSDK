import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';

import PortfolioComponent from '../Portfolio';
import HoldingComponent from '../Holding';
import Title from '../../common/Title';
import AppContainer from '../../common/AppContainer';
import Description from '../../common/Description';
import Loading from '../../common/Loading';
import BalanceChart from '../../home/BalanceChart';

import {
  WHITE,
  BLUE100,
  BLACK100,
  GREEN400,
  GREEN800,
  GREEN1100,
  GREEN1300,
  RED300,
  RED400,
} from '../../../theme/colors';
import {
  extraLargeText,
  veryLargeText,
  smallMediumText,
  verySmallText,
  mediumText,
} from '../../../theme/fonts';
const CONTROLS = ['1d', '1w', '1m', '6m', '1y'];
const { width } = Dimensions.get('screen');

const FundDetails = ({
  stockDetails,
  duration,
  setDuration,
  data,
  selectedStock,
}) => {
  const { isLoading, isTimeSeriesLoading } = useSelector((state) => state.home);

  const stockDetailList = useMemo(() => {
    return [
      {
        label1: 'Opening price',
        label2: `$${stockDetails?.open || 0}`,
      },
      {
        label1: 'Previous closing price',
        label2: `$${stockDetails?.previousClose || 0}`,
      },
      {
        label1: '52 week high',
        label2: `$${stockDetails?.fiftyTwoWeekHigh || 0}`,
      },
      {
        label1: '52 week low',
        label2: `$${stockDetails?.fiftyTwoWeekLow || 0}`,
      },
      {
        label1: 'Volume',
        label2: `$${stockDetails?.volume?.toLocaleString('en-US') || 0}`,
      },
    ];
  }, [stockDetails]);

  const cents = useMemo(() => {
    return selectedStock?.weight ? (selectedStock.weight / 100).toFixed(2) : '';
  }, [selectedStock]);

  const chartData = useMemo(() => {
    if (!data) {
      return [];
    }
    const keys = Object.keys(data);
    let temp = null;
    keys.forEach((v) => {
      if (v !== 'Meta Data') {
        temp = data[v];
      }
    });
    const values = Object.values(temp);
    const closeData = values
      .map((p) => Number(p['4. close']))
      .filter((v) => !!v);
    return closeData || [];
  }, [data]);

  const compareFund = useMemo(() => {
    if (chartData?.length > 0) {
      const diff = chartData[chartData.length - 1] - chartData[0];
      const percent = (
        (chartData[chartData.length - 1] / chartData[0]) * 100 -
        100
      ).toFixed(2);
      return {
        diff:
          diff > 0
            ? `+$${Number(diff).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            : `-$${Math.abs(diff).toFixed(2)}`,
        percent,
      };
    }
    return {
      diff: 0,
      percent: 0,
    };
  }, [chartData]);

  const renderHoldingHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.holdingTitle}>Top 10 holdings</Text>
      </View>
    );
  };

  const renderDescription = () => {
    return (
      <Text>
        Roughly ${cents} from every dollar put into your portfolio will be
        invested in this fund (
        <Text style={styles.symbol}>{selectedStock?.label}</Text>
        ).
      </Text>
    );
  };

  return (
    <View style={styles.appContainer}>
      <Description
        style={styles.descriptionContainer}
        textStyle={styles.description}
        description={renderDescription()}
      />
      <Title
        label={`$${Number(
          stockDetails?.currentPurchasePrice || 0,
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        textStyle={styles.price}
      />
      <View style={styles.chartContainer}>
        {(isLoading || isTimeSeriesLoading) && <Loading />}
        <Text
          style={
            compareFund.percent > 0 ? styles.plus : styles.minus
          }>{`${compareFund.diff} (${compareFund.percent}%)`}</Text>
        <BalanceChart
          style={styles.chartStyle}
          data={chartData}
          lineColor={compareFund.percent > 0 ? GREEN1100 : RED400}
          gradientStartColor={compareFund.percent > 0 ? GREEN400 : RED400}
          gradientStartOpacity={compareFund.percent > 0 ? 0.2 : 0.1}
        />
      </View>
      <AppContainer flatList style={styles.appContainer}>
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
                  {control}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.activityFlatList}>
          <FlatList
            data={stockDetailList}
            renderItem={({ item, index }) => (
              <PortfolioComponent
                item={item}
                isLastItem={index === stockDetailList.length - 1}
                isForward={false}
                disabled={true}
              />
            )}
            keyExtractor={(item, index) => `stockDetail${index}`}
            scrollEnabled={false}
            listKey="stockDetail"
          />
        </View>
        <View>
          <FlatList
            data={stockDetails?.holdings}
            renderItem={({ item }) => <HoldingComponent item={item} />}
            keyExtractor={(item, index) => `holding${index}`}
            scrollEnabled={false}
            listKey="holding"
            numColumns={2}
            ListHeaderComponent={renderHoldingHeader}
            ListHeaderComponentStyle={styles.holdingHeader}
          />
        </View>
      </AppContainer>
    </View>
  );
};

export default FundDetails;

const styles = StyleSheet.create({
  appContainer: {
    alignItems: 'center',
  },
  descriptionContainer: {
    width: 280,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 13,
  },
  description: {
    textAlign: 'center',
    ...smallMediumText,
  },
  price: {
    textAlign: 'center',
    ...extraLargeText,
    color: BLACK100,
  },
  activityFlatList: {
    width: '100%',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderColor: GREEN800,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 43,
  },
  holdingTitle: {
    ...veryLargeText,
    fontWeight: '600',
    color: BLACK100,
    textAlign: 'center',
  },
  holdingHeader: {
    marginBottom: 10,
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
  chartStyle: {
    height: 167,
    marginTop: 51,
    width: width,
  },
  contrlContainer: {
    flexDirection: 'row',
    marginTop: 80,
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
    textTransform: 'uppercase',
    textAlign: 'center',
    width: 22,
  },
  symbol: {
    textTransform: 'uppercase',
  },
  chartContainer: {
    alignItems: 'center',
  },
});
