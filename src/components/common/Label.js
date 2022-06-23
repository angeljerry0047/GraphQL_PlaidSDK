import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { smallText } from '../../theme/fonts';
import { BLACK200 } from '../../theme/colors';

const Label = (props) => {
  const { style, textStyle, label } = props;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.textStyle, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  textStyle: {
    color: BLACK200,
    ...smallText,
  },
});

export default Label;
