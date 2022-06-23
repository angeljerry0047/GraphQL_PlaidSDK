import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { normalText } from '../../theme/fonts';
import { BLACK100 } from '../../theme/colors';

const StickyHeaderTitle = (props) => {
  const { textStyle, label } = props;

  return <Text style={[styles.textStyle, textStyle]}>{label}</Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    color: BLACK100,
    ...normalText,
  },
});

export default StickyHeaderTitle;
