import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';

import { BLACK200 } from '../../theme/colors';
import { normalText } from '../../theme/fonts';

const ClickableEmailAddress = (props) => {
  const { emailAddress } = props;

  const onPress = () => {
    Linking.openURL(`mailto:${emailAddress}`);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{emailAddress}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: BLACK200,
    ...normalText,
    textDecorationLine: 'underline',
    textDecorationColor: BLACK200,
    transform: [{ translateY: 2 }],
  },
});

export default ClickableEmailAddress;
