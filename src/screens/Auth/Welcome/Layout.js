import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Title from './Title';
import Description from './Description';

const WelcomeLayout = ({ icon, title, description, descriptionContainer }) => {
  return (
    <View style={styles.container}>
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

export default WelcomeLayout;

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
