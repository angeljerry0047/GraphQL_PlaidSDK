import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';

import AppLayout from '../../../components/common/AppLayout';
import Bottom from '../../../components/common/Bottom';
import TextInput from '../../../components/common/TextInput';
import Overlay from '../../../components/common/Overlay';
import { validatePassword } from '../../../utility';
import { normalText } from '../../../theme/fonts';
import { BLUE100, WHITE } from '../../../theme/colors';
import { userActions } from '../../../actions/user';
import CheckSvg from '../../../assets/icons/check-icon.svg';
import EyeSvg from '../../../assets/icons/eye-icon.svg';
import ClosedEyeSvg from '../../../assets/icons/eye-crossed-icon.svg';

const PasswordInputView = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [checkedString, setCheckedString] = useState(false);
  const [checkedSpecial, setCheckedSpecial] = useState(false);
  const [checkedNumber, setCheckedNumber] = useState(false);
  const [checkedLength, setCheckedLength] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const validation = validatePassword(password);
    setCheckedLength(false);
    setCheckedString(false);
    setCheckedNumber(false);
    setCheckedSpecial(false);
    if (validation.checkedLength) {
      setCheckedLength(true);
    }
    if (validation.checkedString) {
      setCheckedString(true);
    }
    if (validation.checkedSpecial) {
      setCheckedSpecial(true);
    }
    if (validation.checkedNumber) {
      setCheckedNumber(true);
    }
  }, [password]);

  const handleOnChange = (text) => {
    setPassword(text);
    setErrorMessage(null);
  };

  const handleNextPage = async () => {
    if (checkedString && checkedLength && checkedSpecial && checkedNumber) {
      try {
        setIsLoading(true);
        const res = await Auth.signUp({
          username: user.email,
          password: password,
          attributes: {
            email: user.email,
          },
        });
        setIsLoading(false);
        dispatch(
          userActions.setUserInfo({
            password,
            userSub: res.userSub,
            id: res.userSub,
            userId: res.userSub,
            appStatus: {
              parent: 'SignUp',
              sub: 'Step2b',
            },
          }),
        );

        navigation.navigate('Step3');
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        if (err.message === 'An account with the given email already exists.') {
          setErrorMessage(
            'This email address is already associated to an account',
          );
          return;
        }
        setErrorMessage(err.message);
      }
      return;
    }
    setErrorMessage('Please use the password rules below.');
  };

  const renderItem = (text, validation) => {
    return (
      <View style={styles.renderItem}>
        {validation ? (
          <CheckSvg width={16} height={16} />
        ) : (
          <Text style={styles.icon}>•</Text>
        )}
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLayout
        label="Now, create your password."
        renderListItem={() => (
          <>
            <TextInput
              label="Secure password"
              placeholder=""
              onChangeText={handleOnChange}
              text={password}
              containerStyle={styles.textInput}
              secureTextEntry={secureTextEntry}
              icon={secureTextEntry ? <ClosedEyeSvg /> : <EyeSvg />}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              onSubmitEditing={handleNextPage}
              error={errorMessage}
              autoFocus={true}
            />
            <View style={styles.info}>
              {renderItem('8-16 characters', checkedLength)}
              {renderItem('Upper and lower case', checkedString)}
              {renderItem('Numbers', checkedNumber)}
              {renderItem('Special characters (ex: @#$)', checkedSpecial)}
            </View>
          </>
        )}>
        <Bottom
          label="Continue"
          onPress={handleNextPage}
          isLoading={isLoading}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAwayStyle}
        />
      </AppLayout>
      <Overlay isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default PasswordInputView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  textInput: {
    marginTop: 51,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
  info: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 3,
    borderRadius: 10,
    backgroundColor: BLUE100,
    marginTop: 13,
  },
  renderItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  text: {
    ...normalText,
    color: 'rgba(255, 255, 255, 0.94)',
    marginLeft: 9,
  },
  icon: {
    ...normalText,
    color: 'rgba(255, 255, 255, 0.94)',
  },
  buttonWithKeyboardAwayStyle: {
    position: 'relative',
  },
});
