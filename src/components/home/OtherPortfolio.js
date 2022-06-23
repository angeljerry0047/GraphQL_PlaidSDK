import React from 'react';
import { StyleSheet, View } from 'react-native';

import SelectedPortfolio from './SelectedPortfolio';
import { GREY500, WHITE } from '../../theme/colors';

const OtherPortfolio = ({ model, listKey, onPress }) => {
  return (
    <View style={styles.container}>
      <SelectedPortfolio
        model={model}
        style={styles.flatList}
        listKey={listKey}
        onPress={onPress}
      />
    </View>
  );
};

export default OtherPortfolio;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 33,
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
  },
  flatList: {
    width: '100%',
    borderRadius: 12,
    borderColor: GREY500,
    borderWidth: 1,
    marginBottom: 120,
    paddingHorizontal: 20,
    marginTop: 40,
    backgroundColor: WHITE,
  },
});
