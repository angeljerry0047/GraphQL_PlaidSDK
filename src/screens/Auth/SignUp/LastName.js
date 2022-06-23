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

const LastNameInputView = ({ route, navigation }) => {
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setLastName(user.lastName);
  }, [user]);

  const handleOnChange = (text) => {
    setLastName(text);
    setError(null);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = async () => {
    if (lastName && !!lastName.trim() && validationName(lastName)) {
      dispatch(
        userActions.setUserInfo({
          lastName: lastName.trim(),
          appStatus: {
            parent: 'SignUp',
            sub: 'Step5',
          },
        }),
      );
      setError(null);
      if (route?.params?.from === 'review') {
        navigation.navigate('Step13');
        return;
      }

      navigation.navigate('Step5');
      return;
    }
    setError('Please enter your legal last name.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="And your last name?" />
        <TextInput
          label="Legal last name"
          placeholder=""
          onChangeText={handleOnChange}
          text={lastName}
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

export default LastNameInputView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  textInput: {
    marginTop: 51,
  },
});
