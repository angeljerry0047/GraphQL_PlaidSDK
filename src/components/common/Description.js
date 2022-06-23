import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { normalText } from '../../theme/fonts';
import { BLACK200 } from '../../theme/colors';

const Description = (props) => {
  const { style, textStyle, description, children } = props;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.textStyle, textStyle]}>
        {description}
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    maxWidth: 310,
  },
  textStyle: {
    color: BLACK200,
    ...normalText,
  },
});

export default Description;
