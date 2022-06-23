import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BLACK100, GREY500, WHITE300 } from '../../theme/colors';
import { normalBoldText } from '../../theme/fonts';
import CheckSvg from '../../assets/icons/check-blue-icon.svg';

const BaseSelectInput = (props) => {
  const {
    containerStyle,
    item,
    handleSelectedItem,
    textStyle,
    iconStyle,
    selectedItems = [],
    isIcon,
  } = props;

  return (
    <TouchableOpacity onPress={() => handleSelectedItem(item.value)}>
      <View
        style={
          selectedItems.includes(item.value)
            ? [styles.container, styles.selectedContainer, containerStyle]
            : [styles.container, styles.unSelectedContainer, containerStyle]
        }>
        <Text style={[styles.text, textStyle]}>{item.label}</Text>
        {isIcon && selectedItems.includes(item.value) && (
          <View style={[styles.icon, iconStyle]}>
            <CheckSvg width={16} height={16} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    ...normalBoldText,
    color: BLACK100,
  },
  container: {
    backgroundColor: GREY500,
    borderRadius: 10,
    paddingVertical: 17,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedContainer: {
    borderColor: BLACK100,
    borderWidth: 1,
  },
  unSelectedContainer: {
    borderColor: WHITE300,
    borderWidth: 1,
  },
});

export default BaseSelectInput;
