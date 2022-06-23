import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';

import { BLACK200 } from '../../theme/colors';
import { normalText } from '../../theme/fonts';

const ClickablePhoneNumber = (props) => {
  const { phoneNumber } = props;

  const onPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{phoneNumber}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: BLACK200,
    ...normalText,
    textDecorationLine: 'underline',
    textDecorationColor: BLACK200,
    transform: [{ translateY: 3 }],
  },
});

export default ClickablePhoneNumber;
