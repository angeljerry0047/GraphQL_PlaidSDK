import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { BLACK100, RED200 } from '../../theme/colors';
import { normalText } from '../../theme/fonts';
import ErrorSvg from '../../assets/icons/error-icon.svg';

const ErrorText = (props) => {
  const { error, errorStyle, errorContainer } = props;

  return (
    <View style={[styles.errorView, errorContainer]}>
      <ErrorSvg />
      <Text style={[styles.error, errorStyle]}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorView: {
    marginTop: 13,
    backgroundColor: RED200,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    color: BLACK100,
    ...normalText,
    marginLeft: 9,
  },
});

export default ErrorText;
