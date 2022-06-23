import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Title from './Title';
import Description from './Description';

const ImageLayout = ({
  icon,
  title,
  description,
  descriptionContainer,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon}
      <Title label={title} textStyle={styles.title} />
      <Description
        textStyle={styles.description}
        description={description}
        style={[styles.descriptionContainer, descriptionContainer]}
      />
    </View>
  );
};

export default ImageLayout;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: hp('15%'),
  },
  title: {
    paddingTop: 51,
    textAlign: 'center',
  },
  description: {
    marginTop: 3,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 21,
  },
  descriptionContainer: {
    maxWidth: Dimensions.get('screen').width,
  },
});
