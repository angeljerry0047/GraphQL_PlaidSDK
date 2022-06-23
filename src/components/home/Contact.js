import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

import {
  BLACK100,
  WHITE,
  GREEN800,
  GREY200,
  GREEN1000,
} from '../../theme/colors';
import { mediumText } from '../../theme/fonts';

const Contact = ({ item, isLastItem, handleChangeSwitch }) => {
  const { label1, label2, isEnabled, value } = item;
  return (
    <View style={[styles.container, isLastItem && styles.noBorder]}>
      <View>
        <Text style={styles.label1}>{label1}</Text>
        {value === 'mail' && label2 && (
          <>
            <Text style={styles.label2}>
              {JSON.parse(label2)?.streetAddress?.[0]}
            </Text>
            <Text style={styles.label2}>
              {JSON.parse(label2)?.city} {JSON.parse(label2)?.state}{' '}
              {JSON.parse(label2)?.postalCode}
            </Text>
          </>
        )}
        {!!label2 && value !== 'mail' && (
          <Text style={styles.label2}>{label2}</Text>
        )}
      </View>

      <Switch
        trackColor={{ false: GREY200, true: GREEN1000 }}
        onValueChange={(val) => handleChangeSwitch(val, value)}
        value={isEnabled}
        style={styles.switch}
      />
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    borderTopColor: GREEN800,
    borderTopWidth: 1,
    paddingVertical: 25,
    justifyContent: 'space-between',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  label1: {
    ...mediumText,
    color: BLACK100,
    marginTop: 4,
  },
  label2: {
    ...mediumText,
    marginTop: 12,
    color: BLACK100,
  },
  noMargin: {
    marginRight: 0,
    marginLeft: 0,
  },
  switch: {
    width: 42,
    height: 26,
  },
});
