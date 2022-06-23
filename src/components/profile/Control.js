import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { normalBoldText } from '../../theme/fonts';
import { BLACK100, WHITE, GREY700, BLUE100 } from '../../theme/colors';
import MinusIconSvg from '../../assets/icons/minus-icon.svg';
import PlusIconSvg from '../../assets/icons/plus-icon.svg';

const Control = (props) => {
  const { style, textStyle, label, handleMinus, handlePlus } = props;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.textStyle, textStyle]}>{label}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleMinus}>
          <View style={styles.button}>
            <MinusIconSvg />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlus}>
          <View style={styles.button}>
            <PlusIconSvg />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: BLACK100,
    paddingRight: 3,
    paddingLeft: 20,
    backgroundColor: WHITE,
    borderColor: GREY700,
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 46,
    width: 267,
    alignSelf: 'center',
  },
  textStyle: {
    ...normalBoldText,
    color: BLACK100,
  },
  buttons: {
    flexDirection: 'row',
    width: 120,
    borderRadius: 100,
    backgroundColor: BLUE100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 1,
    shadowColor: BLACK100,
    shadowOpacity: 0.15,
  },
  button: {
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default Control;
