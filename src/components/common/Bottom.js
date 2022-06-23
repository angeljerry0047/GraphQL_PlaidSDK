import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Keyboard, Dimensions } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import Button from './Button';
import { WHITE, WHITE200 } from '../../theme/colors';

const Bottom = ({
  onPress,
  label,
  children,
  isLoading,
  position = 'bottom',
  isDisabled,
  buttonStyle,
  buttonTextStyle,
  buttonWithKeyboardAwayStyle,
  hidden = false,
  style,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View
      style={[
        styles.bottom,
        buttonWithKeyboardAwayStyle,
        isKeyboardVisible && styles.hasBorder,
        style,
      ]}>
      {position === 'top' && children}
      {!hidden && (
        <Button
          disabled={isDisabled}
          label={label}
          onPress={onPress}
          isLoading={isLoading}
          style={buttonStyle}
          textStyle={buttonTextStyle}
        />
      )}
      {position === 'bottom' && children}
    </View>
  );
};

export default Bottom;

const styles = StyleSheet.create({
  bottom: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 30,
    backgroundColor: WHITE,
    position: 'absolute',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    ...ifIphoneX(
      {
        bottom: 0,
      },
      {
        bottom: 4,
      },
    ),
  },
  hasBorder: {
    borderTopColor: WHITE200,
    borderTopWidth: 1,
    paddingTop: 16,
    bottom: 0,
  },
});
