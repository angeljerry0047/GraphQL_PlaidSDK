import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { BLACK100, GREEN600, GREY700, WHITE } from '../../../theme/colors';
import { mediumText } from '../../../theme/fonts';

const ActivityTypeItem = ({ item, onPress, selectedItem }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.value)}>
      <View
        style={[
          styles.container,
          selectedItem === item.value && styles.selectedItem,
        ]}>
        <Text
          style={[
            styles.label,
            selectedItem === item.value && styles.selectedLabel,
          ]}>
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityTypeItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderColor: GREY700,
    borderWidth: 1,
    borderRadius: 100,
    marginRight: 14,
    backgroundColor: WHITE,
  },
  selectedItem: {
    backgroundColor: GREEN600,
  },
  label: {
    ...mediumText,
    fontWeight: '600',
    color: BLACK100,
  },
  selectedLabel: {
    color: WHITE,
  },
});
