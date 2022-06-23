import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import { validateEmail } from '../../../utility';
import { WHITE } from '../../../theme/colors';
import { userActions } from '../../../actions/user';
import { portfolioActions } from '../../../actions/portfolio';
import { homeActions } from '../../../actions/home';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const EmailInputView = ({ navigation }) => {
  const [email, setEmail] = useState('');
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
      dispatch(userActions.clearUserData());
      dispatch(portfolioActions.clearPortfolioData());
      dispatch(homeActions.clearHomeData());
      dispatch(
        userActions.setUserInfo({
          email,
        }),
      );
      setErrorMessage(null);
      navigation.navigate('Step2');
      return;
    }
    setErrorMessage('Please enter a valid email address.');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="Let’s start with your email." />
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
