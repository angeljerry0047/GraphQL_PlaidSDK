import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import { WHITE } from '../../../theme/colors';
import { userActions } from '../../../actions/user';
import { validationName } from '../../../utility';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const FirstNameInputView = ({ route, navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setFirstName(user.firstName);
  }, [user]);

  const handleOnChange = (text) => {
    setFirstName(text);
    setError(null);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = async () => {
    if (firstName && !!firstName.trim() && validationName(firstName)) {
      setError(null);
      dispatch(
        userActions.setUserInfo({
          firstName: firstName.trim(),
          appStatus: {
            parent: 'SignUp',
            sub: 'Step4',
          },
        }),
      );

      if (route?.params?.from === 'review') {
        navigation.navigate('Step13');
        return;
      }
      navigation.navigate('Step4');
      return;
    }
    setError('Please enter your legal first name. ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="What’s your first name?" />
        <TextInput
          label="Legal first name"
          placeholder=""
          onChangeText={handleOnChange}
          text={firstName}
          containerStyle={styles.textInput}
          error={error}
          onSubmitEditing={handleNextPage}
          autoCapitalize={'words'}
          autoFocus={true}
        />
        <Bottom
          label={route?.params?.from === 'review' ? 'Update' : 'Continue'}
          onPress={handleNextPage}
        />
      </AppContainer>
    </SafeAreaView>
  );
};

export default FirstNameInputView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  textInput: {
    marginTop: 51,
  },
});
