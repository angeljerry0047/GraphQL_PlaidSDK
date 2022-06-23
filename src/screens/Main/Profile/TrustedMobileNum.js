import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Header from '../../../components/common/Header';
import Label from '../../../components/common/Label';
import ErrorText from '../../../components/common/ErrorText';
import { veryLargeText } from '../../../theme/fonts';
import { WHITE400, BLACK100, GREY100 } from '../../../theme/colors';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const TrustedMobileNum = ({ navigation, route }) => {
  const [phoneNum, setPhoneNum] = useState('');
  const [formattedNum, setFormattedNum] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const phoneInput = useRef(null);

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
    setErrorMessage(null);
    route.params.onSelect(phoneNum);
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
        <Title label="Enter the mobile number of your trusted contact." />
        <View style={styles.phoneView}>
          <Label label="Mobile number" />
          <TextInputMask
            ref={phoneInput}
            onChangeText={(formatted, extracted) => {
              setPhoneNum(extracted);
              setFormattedNum(formatted);
              setErrorMessage(null);
            }}
            mask={'[000]-[000]-[0000]'}
            placeholder="___-___-____"
            placeholderTextColor={GREY100}
            keyboardType="number-pad"
            style={styles.textInput}
          />
        </View>
        {!!errorMessage && <ErrorText error={errorMessage} />}
        <Bottom
          label="Continue"
          onPress={handleNextPage}
          isDisabled={!phoneNum}
        />
      </AppContainer>
    </SafeAreaView>
  );
};

export default TrustedMobileNum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
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
  header: {
    paddingTop: 10,
  },
});
