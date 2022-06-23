import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { extraLargeText } from '../../theme/fonts';
import { BLACK100 } from '../../theme/colors';

const Title = (props) => {
  const { style, textStyle, label } = props;

  return (
    <View style={style}>
      <Text style={[styles.textStyle, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: BLACK100,
    ...extraLargeText,
  },
});

export default Title;
