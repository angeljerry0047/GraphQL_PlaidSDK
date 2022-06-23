import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { WHITE200 } from '../../theme/colors';
const StickyHeader = (props) => {
  const {
    onPressLeft,
    onPressRight,
    rightIcon,
    leftIcon,
    centerIcon,
    containerStyle,
    leftStyle,
    rightStyle,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {!!leftIcon && (
        <TouchableOpacity
          onPress={onPressLeft}
          style={[styles.leftIcon, leftStyle]}>
          {leftIcon}
        </TouchableOpacity>
      )}
      <View style={styles.center}>{centerIcon}</View>
      {!!rightIcon && (
        <TouchableOpacity
          onPress={onPressRight}
          style={[styles.rightIcon, rightStyle]}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StickyHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    marginBottom: 0,
    height: 52,
    borderBottomColor: WHITE200,
    borderBottomWidth: 1,
  },
  center: {
    paddingTop: 13,
    paddingBottom: 20,
  },
  leftIcon: {
    position: 'absolute',
    left: 10,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 23,
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    paddingLeft: 22,
    paddingRight: 20,
    paddingTop: 13,
    paddingBottom: 20,
  },
});
