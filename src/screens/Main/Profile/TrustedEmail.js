import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Keyboard } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import { validateEmail } from '../../../utility';
import { WHITE400 } from '../../../theme/colors';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const TrustedEmail = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setEmail(route?.params?.email);
  }, [route]);

  const handleOnChange = (text) => {
    setEmail(text);
    setErrorMessage(null);
  };

  const handleNextPage = async () => {
    Keyboard.dismiss();
    if (validateEmail(email)) {
      setErrorMessage(null);
      route.params.onSelect(email);
      navigation.goBack();
      return;
    }
    setErrorMessage('Please enter a valid email address.');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.header}
      />
      <AppContainer>
        <Title label="Enter the email address of your trusted contact." />
        <TextInput
          label="Email"
          placeholder=""
          onChangeText={handleOnChange}
          text={email}
          containerStyle={styles.textInput}
          error={errorMessage}
          keyboardType="email-address"
          onSubmitEditing={handleNextPage}
          autoFocus={true}
        />
        <Bottom label="Continue" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default TrustedEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  textInput: {
    marginTop: 51,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    paddingTop: 10,
  },
});
