import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RippleLoader } from 'react-native-indicator';

import { largeBoldText } from '../../theme/fonts';
import { WHITE, BLUE100, GREY500, GREY100 } from '../../theme/colors';

const BaseButton = (props) => {
  const {
    style,
    textStyle,
    label,
    onPress,
    disabled = false,
    isLoading = false,
  } = props;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || isLoading}>
      <View
        style={
          disabled
            ? [styles.button, styles.disabled, style]
            : [styles.button, style]
        }>
        {isLoading ? (
          <View style={styles.loader}>
            <RippleLoader
              color="rgb(255, 255, 255, 0.8)"
              strokeWidth={2}
              frequency={1000}
              size={30}
            />
          </View>
        ) : (
          <Text
            style={[
              styles.textStyle,
              textStyle,
              disabled && styles.disabledLabel,
            ]}>
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLUE100,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    height: 50,
  },
  disabled: {
    backgroundColor: GREY500,
  },
  disabledLabel: {
    color: GREY100,
  },
  textStyle: {
    color: WHITE,
    ...largeBoldText,
  },
  loader: {
    position: 'absolute',
  },
});

export default BaseButton;
