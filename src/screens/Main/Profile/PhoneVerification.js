import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Auth, API, graphqlOperation } from 'aws-amplify';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Description from '../../../components/common/Description';
import Header from '../../../components/common/Header';
import ErrorText from '../../../components/common/ErrorText';
import Overlay from '../../../components/common/Overlay';
import { updateUserInformation } from '../../../graphql/mutations';
import { portfolioActions } from '../../../actions/portfolio';
import { BLACK100, BLACK200, WHITE400, GREY200 } from '../../../theme/colors';
import { veryLargeText, normalText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const CELL_COUNT = 6;
const { width } = Dimensions.get('screen');

const VerificationView = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { apex, isLoading: pIsLoading } = useSelector(
    (state) => state.portfolio,
  );
  const dispatch = useDispatch();

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleOnChange = (text) => {
    setValue(text);
    setError(null);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = async () => {
    if (value.length !== 6) {
      setError('This code doesn’t match the one sent.');
      return;
    }

    try {
      setIsLoading(true);
      await Auth.verifyCurrentUserAttributeSubmit('phone_number', value);
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            mobileNumber: user.mobileNumber,
          },
        }),
      );
      const data = {
        payload: {
          account: apex.apexAccount,
          updateForm: {
            contact: {
              phoneNumbers: [
                {
                  phoneNumber: user.mobileNumber,
                  phoneNumberType: 'MOBILE',
                },
              ],
            },
          },
        },
        token: `Bearer ${user?.jwt}`,
        router: 'VerificationSuccess',
        description:
          'Your mobile number will be updated in our systems within 24 hours.',
      };
      dispatch(portfolioActions.updateApexAccountRequest(data));

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError('This code doesn’t match the one sent');
    }
  };

  const handleResendCode = async () => {
    setError(null);
    try {
      setIsLoading(true);
      await Auth.verifyCurrentUserAttribute('phone_number');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.header}
      />
      <AppContainer>
        <Title label="We sent you a code." />
        <Description
          description={`We sent a code to ***-${user.mobileNumber.substr(
            -4,
          )}. Enter it here to verify this number.`}>
          <TouchableOpacity style={styles.resend} onPress={handleResendCode}>
            <Text style={styles.resendBtn}>Resend code</Text>
          </TouchableOpacity>
        </Description>
        {/* <OTPInputView
          pinCount={6}
          code={value}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
          onCodeChanged={(code) => handleOnChange(code)}
          keyboardType="number-pad"
        /> */}
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={(text) => handleOnChange(text)}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoFocus={true}
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              style={[
                styles.cell,
                !!symbol && styles.focusCell,
                isFocused && styles.focusCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        {!!error && <ErrorText error={error} />}
        <Bottom
          label="Continue"
          onPress={handleNextPage}
          isLoading={isLoading || pIsLoading}
        />
      </AppContainer>
      <Overlay isLoading={isLoading || pIsLoading} />
    </SafeAreaView>
  );
};

export default VerificationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
  resendBtn: {
    color: BLACK200,
    ...normalText,
    textDecorationLine: 'underline',
    textDecorationColor: BLACK200,
  },
  codeFieldRoot: {
    marginTop: 50,
  },
  cell: {
    width: Math.floor((width - 80) / 6) - 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: GREY200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    ...veryLargeText,
    color: BLACK100,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: BLACK100,
  },
  resend: {
    paddingLeft: 5,
    marginTop: -3,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: GREY200,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: BLACK100,
  },
  header: {
    paddingTop: 10,
  },
});
