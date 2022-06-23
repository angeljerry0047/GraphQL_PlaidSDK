import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import AppContainer from '../../components/common/AppContainer';
import Title from '../../components/common/Title';
import Bottom from '../../components/common/Bottom';
import Header from '../../components/common/Header';
import Description from '../../components/common/Description';
import Label from '../../components/common/Label';
import ErrorText from '../../components/common/ErrorText';
import { veryLargeText } from '../../theme/fonts';
import { WHITE, BLACK100, GREY100 } from '../../theme/colors';
import { statusActions } from '../../actions/status';
import { userActions } from '../../actions/user';
import { updateUserInformation } from '../../graphql/mutations';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';

const MonthlyContribution = ({ route, navigation }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const amountInput = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    amountInput?.current?.focus();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = async () => {
    try {
      if (amount) {
        setError(null);
        await API.graphql(
          graphqlOperation(updateUserInformation, {
            input: {
              id: user.id,
              monthlyContribution: +amount,
            },
          }),
        );

        dispatch(
          userActions.setUserInfo({
            monthlyContribution: +amount,
          }),
        );

        if (route?.params?.from === 'confirmSchedule') {
          return navigation.navigate('ConfirmSchedule');
        }

        dispatch(
          statusActions.setAppCurrentStatus({
            parent: 'Portfolio',
            sub: 'BankFee',
          }),
        );
        navigation.navigate('BankFee');
      } else {
        setError('Please enter a contribution amount.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="Enter a monthly contribution." />
        <Description description="Enter the amount you feel comfortable contributing to your portfolio every month." />
        <View style={styles.phoneView}>
          <Label label="Monthly contribution amount" />
          <TextInputMask
            ref={amountInput}
            onChangeText={(formatted, extracted) => {
              setAmount(extracted);
              setError(null);
            }}
            mask={'$[00000000000000]'}
            placeholder=""
            placeholderTextColor={GREY100}
            keyboardType="number-pad"
            style={styles.textInput}
          />
        </View>
        {!!error && <ErrorText error={error} />}
        <Bottom label="Continue" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default MonthlyContribution;

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
