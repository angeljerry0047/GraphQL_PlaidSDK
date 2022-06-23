import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Description from '../../../components/common/Description';
import Header from '../../../components/common/Header';
import ClickableEmailAddress from '../../../components/common/ClickableEmailAddress';
import { WHITE } from '../../../theme/colors';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const WaitingTrustedContact = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.containerStyle}
      />
      <AppContainer>
        <Title label="We’re updating your trusted contact details" />
        <Description description="Your trusted contact is in the process of being updated in our systems so please wait 24 hours before viewing it. For further help, email us at ">
          <ClickableEmailAddress emailAddress="support@stackwellcapital.com" />.
        </Description>
      </AppContainer>
    </SafeAreaView>
  );
};

export default WaitingTrustedContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  containerStyle: {
    paddingTop: 10,
  },
});
