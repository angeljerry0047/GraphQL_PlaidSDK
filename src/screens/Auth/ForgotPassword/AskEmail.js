import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import TextInput from '../../../components/common/TextInput';
import Description from '../../../components/common/Description';
import Header from '../../../components/common/Header';
import { validateEmail } from '../../../utility';
import { WHITE } from '../../../theme/colors';
import { userActions } from '../../../actions/user';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const EmailInputView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleOnChange = (text) => {
    setEmail(text);
    setErrorMessage(null);
  };

  const handleNextPage = async () => {
    Keyboard.dismiss();

    if (validateEmail(email)) {
      dispatch(
        userActions.setUserInfo({
          email,
        }),
      );
      setErrorMessage(null);
      try {
        setIsLoading(true);
        await Auth.forgotPassword(email);
        navigation.navigate('Confirmation');
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Please enter a valid email address.');
    }
  };

  const goBack = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="What’s your email address?" />
        <Description description="Please enter the email address that you use with Stackwell." />
        <TextInput
          label="Email"
          placeholder=""
          onChangeText={handleOnChange}
          text={email}
          containerStyle={styles.textInput}
          error={errorMessage}
          keyboardType="email-address"
          onSubmitEditing={handleNextPage}
        />
        <Bottom
          label="Continue"
          isLoading={isLoading}
          onPress={handleNextPage}
        />
      </AppContainer>
    </SafeAreaView>
  );
};

export default EmailInputView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  textInput: {
    marginTop: 51,
  },
});
