import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Dimensions } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
// import OTPInputView from '@twotalltotems/react-native-otp-input';

import AppLayout from '../../../components/common/AppLayout';
import Bottom from '../../../components/common/Bottom';
import Description from '../../../components/common/Description';
import ErrorText from '../../../components/common/ErrorText';
import { BLACK100, BLACK200, WHITE, GREY200 } from '../../../theme/colors';
import { veryLargeText, normalText } from '../../../theme/fonts';

const CELL_COUNT = 6;
const { width } = Dimensions.get('screen');

const VerificationView = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

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
    navigation.navigate('NewPassword', { vCode: value });
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppLayout
        label="Please check your email."
        renderListItem={() => (
          <>
            <Description
              description={
                'We sent confirmation code to your Email. Enter it here to reset your password.'
              }
            />
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={(text) => handleOnChange(text)}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
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
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAwayStyle}
        />
      </AppLayout>
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
});
