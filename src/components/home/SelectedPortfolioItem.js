import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import PortfolioItemBulletInfo from '../profile/PortfolioItemBulletInfo';
import { GREEN800 } from '../../theme/colors';
import ForwardSvg from '../../assets/icons/home/Forward-black-icon.svg';

const SelectedPortfolioItem = (props) => {
  const {
    containerStyle,
    item,
    labelStyle,
    descriptionStyle,
    index,
    dataLength,
    onPress,
  } = props;

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View
        style={[
          styles.container,
          containerStyle,
          index !== dataLength - 1 && styles.border,
        ]}>
        <PortfolioItemBulletInfo
          item={item}
          labelStyle={labelStyle}
          descriptionStyle={descriptionStyle}
        />
        <ForwardSvg />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  border: {
    borderBottomColor: GREEN800,
    borderBottomWidth: 1,
  },
});

export default SelectedPortfolioItem;
