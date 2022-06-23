import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import RelativeShareCircle from './RelativeShareCircle';
import {
  BLACK100,
  WHITE,
  WHITE_OP20,
  BLUE200,
  GREEN400,
} from '../../theme/colors';
import { normalBoldText } from '../../theme/fonts';

const PortfolioRelativeShareChart = ({ model }) => {
  return (
    <View style={styles.container}>
      {model && (
        <>
          <RelativeShareCircle
            percent={model.stockWeight}
            style={styles.chart}
            primaryColor={BLUE200}
            secondaryColor={GREEN400}
            backgroundColor={BLUE200}
            strokeWidth={7}
          />
          <View>
            <Text style={[styles.text, styles.stockText]}>
              {model.stockWeight}% stocks
            </Text>
            <View style={styles.divider} />
            <Text style={[styles.text, styles.bondText]}>
              {model.bondWeight}% bonds
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default PortfolioRelativeShareChart;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 204,
    height: 204,
    position: 'relative',
  },
  chart: {
    width: 204,
    height: 204,
    shadowColor: BLACK100,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
    position: 'absolute',
  },
  divider: {
    marginVertical: 7,
    width: 80,
    borderTopColor: WHITE_OP20,
    borderTopWidth: 1,
  },
  text: {
    ...normalBoldText,
  },
  stockText: {
    color: WHITE,
    opacity: 0.94,
  },
  bondText: {
    color: GREEN400,
  },
});
