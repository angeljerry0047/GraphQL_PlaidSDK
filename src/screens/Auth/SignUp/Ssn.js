import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';
import { API, graphqlOperation } from 'aws-amplify';

import AppLayout from '../../../components/common/AppLayout';
import Bottom from '../../../components/common/Bottom';
import Label from '../../../components/common/Label';
import ErrorText from '../../../components/common/ErrorText';
import Description from '../../../components/common/Description';
import { updateUserInformation } from '../../../graphql/mutations';
import { veryLargeText } from '../../../theme/fonts';
import { WHITE, BLACK100, GREY100 } from '../../../theme/colors';
import { userActions } from '../../../actions/user';

const SSNInputView = ({ route, navigation }) => {
  const [ssn, setSSN] = useState('');
  const [formattedSSN, setFormattedSSN] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleNextPage = async () => {
    if (ssn.length !== 9) {
      setErrorMessage('Please enter your 9-digit SSN.');
      return;
    }
    try {
      const userInfo = await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            lastFourSSN: ssn.substr(-4),
            appStatus: {
              parent: 'SignUp',
              sub: 'Step13',
            },
          },
        }),
      );
      dispatch(
        userActions.setUserInfo({
          ...userInfo.data.updateUserInformation,
          formattedSSN,
        }),
      );
    } catch (err) {
      console.log(err);
      return;
    }
    navigation.navigate('Step13');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLayout
        label="Please enter your SSN."
        renderListItem={() => (
          <>
            <Description description="This is the last piece of info we need for verification." />
            <View style={styles.ssn}>
              <Label label="Social security number" />
              <TextInputMask
                onChangeText={(formatted, extracted) => {
                  setSSN(extracted);
                  setFormattedSSN(formatted);
                  setErrorMessage(null);
                }}
                mask={'[000]-[00]-[0000]'}
                placeholder="___-__-____"
                keyboardType="number-pad"
                style={styles.textInput}
                value={ssn}
                placeholderTextColor={GREY100}
                autoFocus={true}
              />
            </View>
            {!!errorMessage && <ErrorText error={errorMessage} />}
          </>
        )}>
        <Bottom
          label={route?.params?.from === 'review' ? 'Update' : 'Continue'}
          onPress={handleNextPage}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAwayStyle}
        />
      </AppLayout>
    </SafeAreaView>
  );
};

export default SSNInputView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  ssn: {
    marginTop: 51,
  },
  textInput: {
    ...veryLargeText,
    color: BLACK100,
    borderColor: BLACK100,
    borderBottomWidth: 1,
    paddingBottom: 9,
  },
  buttonWithKeyboardAwayStyle: {
    position: 'relative',
  },
});
