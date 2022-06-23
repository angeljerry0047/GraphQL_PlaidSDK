import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RippleLoader } from 'react-native-indicator';

import { GREEN200, WHITE400 } from '../../theme/colors';

const Loading = ({
  color = GREEN200,
  strokeWidth = 2,
  frequency = 1000,
  size = 30,
  backgroundColor = WHITE400,
}) => {
  return (
    <View
      style={[styles.loaderContainer, { backgroundColor: backgroundColor }]}>
      <RippleLoader
        color={color}
        strokeWidth={strokeWidth}
        frequency={frequency}
        size={size}
      />
    </View>
  );
};

export default Loading;
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 99,
  },
});
