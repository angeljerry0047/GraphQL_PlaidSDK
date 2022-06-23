import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Description from '../../../components/common/Description';
import Header from '../../../components/common/Header';
import ClickableEmailAddress from '../../../components/common/ClickableEmailAddress';
import { WHITE } from '../../../theme/colors';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const NonCitizen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="Sorry for the inconvenience." />
        <Description description="Stackwell is only available to U.S. citizens at this time. If you have questions, please email us at ">
          <ClickableEmailAddress emailAddress="support@stackwellcapital.com" />.
        </Description>
      </AppContainer>
    </SafeAreaView>
  );
};

export default NonCitizen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
