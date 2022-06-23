import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';

import AppLayout from '../../../components/common/AppLayout';
import Header from '../../../components/common/Header';
import Bottom from '../../../components/common/Bottom';
import TextInput from '../../../components/common/TextInput';
import Overlay from '../../../components/common/Overlay';
import { validatePassword } from '../../../utility';
import { normalText } from '../../../theme/fonts';
import { BLUE100, WHITE } from '../../../theme/colors';
import CheckSvg from '../../../assets/icons/check-icon.svg';
import EyeSvg from '../../../assets/icons/eye-icon.svg';
import ClosedEyeSvg from '../../../assets/icons/eye-crossed-icon.svg';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const PasswordInputView = ({ route, navigation }) => {
  const [password, setPassword] = useState('');
  const [checkedString, setCheckedString] = useState(false);
  const [checkedSpecial, setCheckedSpecial] = useState(false);
  const [checkedNumber, setCheckedNumber] = useState(false);
  const [checkedLength, setCheckedLength] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
        await Auth.forgotPasswordSubmit(
          user.email,
          route?.params?.vCode,
          password,
        );
        navigation.navigate('ResetSuccess');
      } catch (err) {
        console.log(err);
        setErrorMessage(
          'The code entered on the previous screen is incorrect. Please go back and try again.',
        );
      } finally {
        setIsLoading(false);
      }
      return;
    }
    setErrorMessage('Please use the password rules below.');
  };
  const goBack = () => {
    navigation.navigate('Confirmation');
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
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />

      <AppLayout
        backVisible={false}
        label="Enter your new password."
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
          label="Reset password"
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
