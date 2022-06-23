import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import AppContainer from '../../../../components/common/AppContainer';
import Title from '../../../../components/common/Title';
import Header from '../../../../components/common/Header';
import Loading from '../../../../components/common/Loading';
import TransferFund from '../../../../components/home/TransferFund';
import Bottom from '../../../../components/common/Bottom';
import Button from '../../../../components/common/Button';
import PlaidButton from '../../../../components/profile/PlaidButton';

import { messageActions } from '../../../../actions/message';
import { portfolioActions } from '../../../../actions/portfolio';

import {
  WHITE,
  WHITE400,
  GREEN800,
  BLACK100,
  GREY500,
  BLUE100,
} from '../../../../theme/colors';
import { largeBoldText } from '../../../../theme/fonts';

import ArrowBackSvg from '../../../../assets/icons/arrow-back-icon.svg';
import BankSvg from '../../../../assets/icons/home/Bank-icon.svg';

const ConnectedBank = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const {
    accounts,
    apexBalance,
    linkToken,
    plaidInfoId,
    apex,
    isLoadingChangeBank,
  } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (!accounts[0]?.mask) {
    }
  }, []);

  const goBack = () => {
    navigation.goBack();
  };
  const removeBank = () => {
    if (accounts[0]?.mask) {
      navigation.navigate('RemovePrompt');
    } else {
      dispatch(
        messageActions.setMessage({
          text1: 'Error',
          text2: "You haven't linked your bank account",
          type: 'info',
        }),
      );
    }
  };
  const onSuccess = (success) => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    const { id: apexUserInfoId, eachMonthContribution } = apex;

    const {
      metadata: { accounts },
      publicToken,
    } = success;
    const payload = {
      token,
      publicToken,
      accounts,
      plaidInfoId,
      apexUserInfoId,
      eachMonthContribution,
      email: user.email,
    };
    dispatch(portfolioActions.changeBankAccountRequest(payload));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.containerStyle}
      />
      <AppContainer>
        <Title label="Connected bank account" />
        <TransferFund
          text1={`${accounts[0]?.name || ''}`}
          text2={`****${accounts[0]?.mask || ''}`}
          icon={<BankSvg />}
          isVisible
        />
        <Bottom hidden>
          <PlaidButton
            linkToken={linkToken}
            onSuccess={onSuccess}
            plaidButtonStyle={styles.plaidButton}>
            <Text style={styles.plaidButtonText}>{'Change bank account'}</Text>
          </PlaidButton>
          <Button
            label="Remove bank account"
            onPress={removeBank}
            style={styles.button}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
      {(isLoadingChangeBank || isLoading) && <Loading />}
    </SafeAreaView>
  );
};

export default ConnectedBank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  activityFlatList: {
    width: '100%',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderColor: GREEN800,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 34,
  },
  containerStyle: {
    paddingTop: 10,
  },
  button: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  plaidButton: {
    height: 50,
    backgroundColor: BLUE100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plaidButtonText: {
    color: WHITE,
    ...largeBoldText,
  },
});
