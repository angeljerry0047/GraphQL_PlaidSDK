import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { BLACK100, WHITE, GREEN800 } from '../../theme/colors';
import { normalText, normalBoldText } from '../../theme/fonts';
import ForwardSvg from '../../assets/icons/home/Forward-black-icon.svg';

const Portfolio = ({
  item,
  isLastItem,
  isForward = true,
  disabled = false,
}) => {
  const { label1, label2, icon, onPress, isHidden } = item;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.container, isLastItem && styles.noBorder]}>
        <View style={styles.item}>
          {icon}
          <Text
            style={[
              styles.label1,
              icon && styles.marginLabel,
              !isForward && styles.noMargin,
            ]}>
            {label1}
          </Text>
        </View>
        <View style={styles.item}>
          <Text
            style={[
              styles.label2,
              (!isForward || isHidden) && styles.noMargin,
            ]}>
            {label2}
          </Text>
          {isForward && !isHidden && (
            <View style={styles.icon}>
              <ForwardSvg />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    paddingBottom: 25,
    borderBottomColor: GREEN800,
    borderBottomWidth: 1,
    paddingVertical: 25,
    justifyContent: 'space-between',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label1: {
    ...normalText,
    color: BLACK100,
  },
  marginLabel: {
    marginLeft: 12,
  },
  label2: {
    ...normalBoldText,
    color: BLACK100,
    marginRight: 12,
  },
  icon: {
    marginTop: 2,
  },
  noMargin: {
    marginRight: 0,
    marginLeft: 0,
  },
});
