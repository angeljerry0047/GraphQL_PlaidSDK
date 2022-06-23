import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import Label from '../../../components/common/Label';
import ErrorText from '../../../components/common/ErrorText';
import Header from '../../../components/common/Header';
import { homeActions } from '../../../actions/home';
import { WHITE400, GREY500, BLUE100, BLACK100 } from '../../../theme/colors';
import { veryLargeText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const TransferAmount = ({ route, navigation }) => {
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(null);
  const [isTransferIn, setTransferIn] = useState(true);
  const amountInput = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { balances } = useSelector((state) => state.home);
  const { accounts, apexBalance } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params.from === 'transferOut') {
      setTransferIn(false);
      return;
    }
  }, [route]);
  useEffect(() => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    dispatch(homeActions.getBalanceRequest(token));
  }, [accounts]);
  const goBack = () => {
    navigation.goBack();
  };

  const goCancel = () => {
    navigation.navigate('TransferHome');
  };

  const handleNextPage = () => {
    if (error) {
      return;
    }
    if (amount && !isNaN(amount)) {
      dispatch(homeActions.setTransferAmount(amount));
      navigation.navigate('TransferReview', { from: route.params.from });
      return;
    }
    setError('Please enter amount.');
  };

  const checkBankBalance = () => {
    if (isTransferIn) {
      return `${accounts?.[0]?.name || ''} ${
        accounts?.[0]?.mask || ''
      } (available $${(balances?.available
        ? Number(balances.available)
        : '0.00'
      ).toLocaleString('en-US')})`;
    }
    return `Stackwell portfolio (available $${Number(
      apexBalance?.balance || 0,
    ).toLocaleString('en-US')})`;
  };

  const checkAvailableBalance = (inputAmount) => {
    if (isTransferIn) {
      if (inputAmount > (balances?.available || 0)) {
        return setError('This amount exceeds available funds.');
      }
      setError(null);
      return;
    }

    if (inputAmount > (apexBalance?.balance || 0)) {
      return setError('This amount exceeds available funds.');
    }
    setError(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.header}
      />
      <AppContainer>
        <Title label="Enter transfer amount" />
        <View style={styles.amountView}>
          <Label label="Transfer amount" />
          <TextInputMask
            ref={amountInput}
            onChangeText={(formatted) => {
              // formatted is a string that includes the leading dollar sign
              const numericValue = +formatted.substring(1);
              setAmount(numericValue);
              checkAvailableBalance(numericValue);
            }}
            mask={'$[99999999999990].[99]'}
            keyboardType="number-pad"
            style={styles.textInput}
            autoFocus={true}
          />
          <Label label={`From: ${checkBankBalance()}`} style={styles.commend} />
        </View>
        {!!error && <ErrorText error={error} />}

        <Bottom label="Review" onPress={handleNextPage}>
          <Button
            label="Cancel"
            onPress={goCancel}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default TransferAmount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  header: {
    paddingTop: 10,
  },
  amountView: {
    marginTop: 51,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  commend: {
    marginTop: 7,
  },
  textInput: {
    ...veryLargeText,
    color: BLACK100,
    borderColor: BLACK100,
    borderBottomWidth: 1,
    paddingBottom: 9,
  },
});
