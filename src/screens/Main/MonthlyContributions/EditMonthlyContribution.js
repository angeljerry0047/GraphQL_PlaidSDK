import React, { useState, useRef, useMemo } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Header from '../../../components/common/Header';
import Description from '../../../components/common/Description';
import Label from '../../../components/common/Label';
import ErrorText from '../../../components/common/ErrorText';
import { veryLargeText } from '../../../theme/fonts';
import { WHITE, BLACK100, GREY100 } from '../../../theme/colors';
import { userActions } from '../../../actions/user';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const MonthlyContribution = ({ route, navigation }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const amountInput = useRef(null);
  const dispatch = useDispatch();
  const { scheduledTransfer, accounts } = useSelector(
    (state) => state.portfolio,
  );

  const { isNew, title, buttonText } = useMemo(() => {
    const hasNewRouteParam = route.params?.type === 'new';
    return {
      isNew: hasNewRouteParam,
      title: hasNewRouteParam
        ? 'Enter a monthly contribution'
        : 'Edit contribution amount',
      buttonText: hasNewRouteParam ? 'Continue' : 'Review Change',
    };
  }, [route.params]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    if (!amount) {
      return setError('Please enter a contribution amount.');
    }

    dispatch(
      userActions.setUserInfo({
        newMonthlyContribution: amount,
        previousMonthlyContribution: scheduledTransfer.amount,
      }),
    );

    if (isNew) {
      if (accounts.length > 0) {
        navigation.navigate('StartContributionReview');
      } else {
        navigation.navigate('ConnectBank');
      }
    } else {
      navigation.navigate('EditContributionReview');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label={title} />
        {isNew && (
          <Description description="Enter the amount you feel comfortable contributing to your portfolio every month." />
        )}

        <View style={styles.content}>
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
          {route.params?.type === 'edit' && (
            <Label
              label={`Current amount: $${scheduledTransfer.amount}`}
              style={styles.label}
            />
          )}
        </View>
        {!!error && <ErrorText error={error} />}
        <Bottom label={buttonText} onPress={handleNextPage} />
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
  content: {
    marginTop: 51,
  },
  textInput: {
    ...veryLargeText,
    color: BLACK100,
    borderColor: BLACK100,
    borderBottomWidth: 1,
    paddingBottom: 9,
  },
  label: {
    marginTop: 7,
  },
});
