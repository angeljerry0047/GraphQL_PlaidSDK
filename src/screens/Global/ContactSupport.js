import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import AppContainer from '../../components/common/AppContainer';
import Title from '../../components/common/Title';
import Description from '../../components/common/Description';
import Header from '../../components/common/Header';
import { BLACK200, WHITE } from '../../theme/colors';
import { normalText } from '../../theme/fonts';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';

const ContactSupport = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const handleContactUs = () => {
    Linking.openURL('mailto:support@stackwellcapital.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="We ran into an issue." />
        <Description description="Unfortunately, we ran into an issue verifying your identity. Before we can create your portfolio, we need to verify that you are who you say you are. For further help, please email us at ">
          <TouchableOpacity style={styles.resend} onPress={handleContactUs}>
            <Text style={styles.resendBtn}>support@stackwellcapital.com.</Text>
          </TouchableOpacity>
        </Description>
      </AppContainer>
    </SafeAreaView>
  );
};

export default ContactSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  resendBtn: {
    color: BLACK200,
    ...normalText,
    textDecorationLine: 'underline',
    textDecorationColor: BLACK200,
  },
});
