import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import { BLACK100, BLACK200, WHITE, GREY700 } from '../../theme/colors';
import { smallMediumText, normalBoldText } from '../../theme/fonts';

const { width } = Dimensions.get('screen');

const Holding = ({ item }) => {
  const { name, symbol } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default Holding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    borderColor: GREY700,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 32,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 80) / 2,
    margin: 10,
  },
  symbol: {
    ...normalBoldText,
    color: BLACK100,
    textAlign: 'center',
  },
  name: {
    ...smallMediumText,
    color: BLACK200,
    textAlign: 'center',
    marginTop: 5,
  },
});
