import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Header = (props) => {
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
      {centerIcon}
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 2,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftIcon: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  rightIcon: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingHorizontal: 20,
  },
});

export default Header;
