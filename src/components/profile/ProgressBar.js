import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { GREY300, BLACK100 } from '../../theme/colors';

const { width } = Dimensions.get('screen');
const Progress = ({ step }) => {
  const progress = step / 8;

  return (
    <ProgressBar
      progress={progress}
      color={BLACK100}
      style={styles.ProgressBar}
    />
  );
};

export default Progress;

const styles = StyleSheet.create({
  ProgressBar: {
    width: width - 180,
    backgroundColor: GREY300,
    borderRadius: 10,
    height: 2,
  },
});
