import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BLACK100, WHITE, BLUE100 } from '../../theme/colors';
import { veryLargeText, normalText, mediumText } from '../../theme/fonts';

const TransferFund = ({ label, text1, text2, isVisible, icon }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <View style={styles.flex}>
          <View style={styles.icon}>{icon}</View>
          <View>
            <Text style={styles.itemText}>{text1}</Text>
            <Text style={styles.itemText2}>{text2}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default TransferFund;

const styles = StyleSheet.create({
  label: {
    color: BLACK100,
    ...veryLargeText,
  },
  container: {
    backgroundColor: BLUE100,
    borderRadius: 12,
    borderColor: BLUE100,
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 43,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemText: {
    ...normalText,
    color: WHITE,
    opacity: 0.94,
  },
  underline: {
    textDecorationLine: 'underline',
    paddingTop: 6,
  },
  itemText2: {
    ...mediumText,
    fontWeight: '600',
    marginTop: 4,
    color: WHITE,
  },
});
