import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import axios from 'axios';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Header from '../../../components/common/Header';
import Label from '../../../components/common/Label';
import ErrorText from '../../../components/common/ErrorText';
import Description from '../../../components/common/Description';
import Overlay from '../../../components/common/Overlay';
import { veryLargeText } from '../../../theme/fonts';
import { WHITE, BLACK100, GREY100 } from '../../../theme/colors';
import { userActions } from '../../../actions/user';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const MobileNumberInputView = ({ navigation }) => {
  const [phoneNum, setPhoneNum] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const phoneInput = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    phoneInput?.current?.focus();
  }, []);
  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = async () => {
    if (phoneNum.length < 10) {
      setErrorMessage('Please enter a 10-digit mobile number.');
      return;
    }
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await axios.post(
        'https://4nv3dxcge1.execute-api.us-east-2.amazonaws.com/dev/update-attributes',
        {
          key: 'phone_number',
          value: `+1${phoneNum}`,
          user_sub: user.id,
        },
      );
      await Auth.resendSignUp(user.email);
      setIsLoading(false);
      dispatch(
        userActions.setUserInfo({
          mobileNumber: `+1${phoneNum}`,
          appStatus: {
            parent: 'SignUp',
            sub: 'Step6',
          },
        }),
      );

      navigation.navigate('Step6');
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message);
      navigation.navigate('ContactSupport', {
        screen: 'GlobalError',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="What’s your mobile number?" />
        <Description description="To verify this number is yours, we’ll text you a code to enter on the next screen." />
        <View style={styles.phoneView}>
          <Label label="Mobile number" />
          <TextInputMask
            ref={phoneInput}
            onChangeText={(formatted, extracted) => {
              setPhoneNum(extracted);
              setErrorMessage(null);
            }}
            mask={'[000]-[000]-[0000]'}
            placeholder="___-___-____"
            placeholderTextColor={GREY100}
            keyboardType="number-pad"
            style={styles.textInput}
            autoFocus={true}
          />
        </View>
        {!!errorMessage && <ErrorText error={errorMessage} />}
        <Bottom
          label="Continue"
          onPress={handleNextPage}
          isLoading={isLoading}
        />
      </AppContainer>
      <Overlay isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default MobileNumberInputView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  phoneView: {
    marginTop: 51,
  },
  textInput: {
    ...veryLargeText,
    color: BLACK100,
    borderColor: BLACK100,
    borderBottomWidth: 1,
    paddingBottom: 9,
  },
});
