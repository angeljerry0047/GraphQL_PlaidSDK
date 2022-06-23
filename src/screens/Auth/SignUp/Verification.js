import React, { useState, useEffect } from 'react';
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
import Modal from 'react-native-modal';

import AppLayout from '../../../components/common/AppLayout';
import Bottom from '../../../components/common/Bottom';
import Description from '../../../components/common/Description';
import ErrorText from '../../../components/common/ErrorText';
import Overlay from '../../../components/common/Overlay';
import InfoPanel from '../../../components/profile/InfoPanel';
import { createUserInformation } from '../../../graphql/mutations';
import { userActions } from '../../../actions/user';
import {
  BLACK100,
  BLACK200,
  WHITE,
  GREY200,
  BLUE100,
} from '../../../theme/colors';
import {
  veryLargeText,
  normalText,
  normalBoldText,
} from '../../../theme/fonts';

const CELL_COUNT = 6;
const { width } = Dimensions.get('screen');

const VerificationView = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [isLoading, setIsLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const { user } = useSelector((state) => state.user);
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

  const handleNextPage = async () => {
    if (value.length !== 6) {
      setError('This code doesn’t match the one sent.');
      return;
    }
    try {
      setIsLoading(true);
      await Auth.confirmSignUp(user.email, value);

      await Auth.signIn({
        username: user.email,
        password: user.password,
      });

      const userInfo = await API.graphql(
        graphqlOperation(createUserInformation, {
          input: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            userId: user.userSub,
            lastFourSSN: '1234',
            appStatus: {
              parent: 'SignUp',
              sub: 'Step7',
            },
          },
        }),
      );
      dispatch(
        userActions.setUserInfo({
          ...userInfo.data.createUserInformation,
        }),
      );

      navigation.navigate('Step7');
    } catch (err) {
      console.log(err);
      setError('This code doesn’t match the one sent');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    const now = new Date().getTime();
    if (Math.floor((now - currentTime) / 1000) < 20) {
      setInfoModalVisible(true);
      return;
    }
    try {
      setIsLoading(true);
      await Auth.resendSignUp(user.email);
      setCurrentTime(now);
      setIsLoading(false);
      setResent(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (resent) {
      setTimeout(() => {
        setResent(false);
      }, 1000 * 20);
    }
  }, [resent]);

  if (!user || !user?.mobileNumber) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppLayout
        label="We sent you a code."
        renderListItem={() => (
          <>
            <Description
              description={`We sent a code to ***-${user?.mobileNumber.substr(
                -4,
              )}. Enter it here to verify this number.`}>
              {resent ? (
                <Text style={styles.sentCode}> New code being sent...</Text>
              ) : (
                <TouchableOpacity
                  style={styles.resend}
                  onPress={handleResendCode}>
                  <Text style={styles.resendBtn}>Resend code</Text>
                </TouchableOpacity>
              )}
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
      <Modal
        isVisible={isInfoModalVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setInfoModalVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel
          handleDismiss={() => setInfoModalVisible(false)}
          description="It may take 20-30 seconds to receive your code. Please press ‘Resend code’ again if you still haven’t received your code after 30 seconds."
        />
      </Modal>
    </SafeAreaView>
  );
};

export default VerificationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
  sentCode: {
    color: BLACK200,
    ...normalBoldText,
    textDecorationColor: BLACK200,
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
  buttonWithKeyboardAwayStyle: {
    position: 'relative',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
