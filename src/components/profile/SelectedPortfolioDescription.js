import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { smallMediumText } from '../../theme/fonts';
import { BLACK200 } from '../../theme/colors';

const SelectedPortfolioDescription = ({ description }) => {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

export default SelectedPortfolioDescription;

const styles = StyleSheet.create({
  descriptionContainer: {
    maxWidth: 240,
    marginBottom: 38,
  },
  descriptionText: {
    ...smallMediumText,
    textAlign: 'center',
    color: BLACK200,
  },
});
