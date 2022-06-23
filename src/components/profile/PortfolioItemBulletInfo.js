import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { BLACK100, BLACK200, GREEN400, BLUE200 } from '../../theme/colors';
import { normalBoldText, smallText } from '../../theme/fonts';

const PortfolioItemBulletInfo = (props) => {
  const { item, labelStyle, descriptionStyle } = props;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.bullet,
          item.type === 'bond' ? styles.bondColor : styles.stockColor,
        ]}>
        •
      </Text>
      <View>
        <Text style={[styles.label, labelStyle]}>{item?.strategyName}</Text>
        <Text style={[styles.description, descriptionStyle]}>
          {item?.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...normalBoldText,
    color: BLACK100,
    marginBottom: 5,
  },
  description: {
    ...smallText,
    color: BLACK200,
  },
  container: {
    flexDirection: 'row',
  },
  bullet: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 21,
    marginRight: 8,
  },
  stockColor: {
    color: BLUE200,
  },
  bondColor: {
    color: GREEN400,
  },
});

export default PortfolioItemBulletInfo;
