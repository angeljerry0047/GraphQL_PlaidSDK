import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { API, graphqlOperation } from 'aws-amplify';

import AppLayout from '../../../components/common/AppLayout';
import Bottom from '../../../components/common/Bottom';
import Label from '../../../components/common/Label';
import ErrorText from '../../../components/common/ErrorText';
import Description from '../../../components/common/Description';
import { updateUserInformation } from '../../../graphql/mutations';
import { veryLargeText } from '../../../theme/fonts';
import { WHITE, BLACK100, GREY100 } from '../../../theme/colors';
import { validationDate } from '../../../utility';
import { userActions } from '../../../actions/user';
import { statusActions } from '../../../actions/status';

const BirthdayInputView = ({ route, navigation }) => {
  const [dob, setDob] = useState('');
  const [formattedDob, setFormattedDob] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setDob(user.birthday);
    setFormattedDob(user.dateOfBirth);
  }, [user]);

  const handleNextPage = async () => {
    if (!dob || dob?.length < 8) {
      setErrorMessage('Please enter your full date of birth.');
      return;
    }
    const isValid = validationDate(dob);
    const today = moment().startOf('day');
    const birthDay = moment(dob, 'MM-DD-YYYY');
    const durationDay = moment.duration(birthDay.diff(today)).asDays();
    const durationYear = moment.duration(today.diff(birthDay)).asYears();
    if (!isValid || durationDay > 0) {
      setErrorMessage('Please enter a valid date of birth.');
      return;
    }
    if (durationYear < 18) {
      setErrorMessage('Stackwell is only available to users 18 and older.');
      return;
    }

    try {
      const userInfo = await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            dateOfBirth: formattedDob,
          },
        }),
      );
      dispatch(
        userActions.setUserInfo({
          ...userInfo.data.updateUserInformation,
        }),
      );
    } catch (err) {
      console.log(err);
      return;
    }
    if (route?.params?.from === 'review') {
      navigation.navigate('Step13');
      return;
    }
    dispatch(
      statusActions.setAppCurrentStatus({
        parent: 'SignUp',
        sub: 'Step12',
      }),
    );
    navigation.navigate('Step12');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLayout
        label="When were you born?"
        renderListItem={() => (
          <>
            <Description description="We ask this for your security. It allows us to verify that you are you." />
            <View style={styles.birthday}>
              <Label label="Date of birth" />
              <TextInputMask
                onChangeText={(formatted, extracted) => {
                  setDob(extracted);
                  setFormattedDob(formatted);
                  setErrorMessage(null);
                }}
                mask={'[00]-[00]-[0000]'}
                placeholder="mm-dd-yyyy"
                placeholderTextColor={GREY100}
                keyboardType="number-pad"
                style={styles.textInput}
                value={dob}
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

export default BirthdayInputView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  birthday: {
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
