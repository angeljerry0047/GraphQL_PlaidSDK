import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import Header from '../../../components/common/Header';
import Loading from '../../../components/common/Loading';
import TransferFund from '../../../components/home/TransferFund';
import { portfolioActions } from '../../../actions/portfolio';

import { BLACK100, WHITE400, GREY500, BLUE100 } from '../../../theme/colors';
import { extraLargeText } from '../../../theme/fonts';
import PortfolioSvg from '../../../assets/icons/home/Portfolio-icon-2.svg';
import BankSvg from '../../../assets/icons/home/Bank-icon.svg';

const TransferFunds = ({ route, navigation }) => {
  const [isTransferIn, setTransferIn] = useState(true);
  const {
    accounts,
    apexBalance,
    apex,
    isLoadingApexAccount,
    plaidInfoId,
    plaidLoading,
  } = useSelector((state) => state.portfolio);

  const { isLoading } = useSelector((state) => state.home);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    dispatch(
      portfolioActions.getApexAccountRequest({
        token,
        from: 'transferFunds',
      }),
    );
  }, []);

  useEffect(() => {
    if (route.params?.plaidData) {
      onSuccess(route.params?.plaidData);
    }
  }, [route.params]);

  const onSuccess = (success) => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;

    const {
      metadata: { accounts },
      publicToken,
    } = success;
    const payload = {
      token,
      publicToken,
      accounts,
      plaidInfoId,
      from: 'TransferFunds',
      account_id: accounts[0].id,
      email: user.email,
    };
    dispatch(portfolioActions.exchangePlaidPublicTokenRequest(payload));
  };

  useEffect(() => {
    if (route.params.from === 'transferOut') {
      setTransferIn(false);
      return;
    }
  }, [route]);

  useEffect(() => {
    if (apex.accountStatus !== 'COMPLETE') {
      navigation.navigate('TransferProcessing');
    }
  }, [apex]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    navigation.navigate('TransferAmount', { from: route.params.from });
  };

  if (isLoadingApexAccount) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<Text style={styles.headerLeft}>Transfer funds</Text>}
        containerStyle={styles.header}
      />
      <AppContainer>
        {isTransferIn ? (
          <>
            <TransferFund
              label="From"
              text1={`${accounts[0]?.name || ''}`}
              text2={`****${accounts[0]?.mask || ''}`}
              icon={<BankSvg />}
              isVisible
            />
            <TransferFund
              label="To"
              text1="Stackwell portfolio"
              text2={`Value: $${Number(
                apexBalance?.balance || 0,
              ).toLocaleString('en-US')}`}
              icon={<PortfolioSvg />}
            />
          </>
        ) : (
          <>
            <TransferFund
              label="From"
              text1="Stackwell portfolio"
              text2={`Available: $${Number(
                apexBalance?.balance || 0,
              ).toLocaleString('en-US')}`}
              icon={<PortfolioSvg />}
            />
            <TransferFund
              label="To"
              text1={`${accounts[0]?.name || ''}`}
              text2={`****${accounts[0]?.mask || ''}`}
              icon={<BankSvg />}
              isVisible
            />
          </>
        )}

        <Bottom
          label="Enter transfer amount"
          onPress={handleNextPage}
          isLoading={isLoading}>
          <Button
            label="Cancel"
            onPress={goBack}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
      {plaidLoading && <Loading backgroundColor="transparent" />}
    </SafeAreaView>
  );
};

export default TransferFunds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  header: {
    paddingTop: 2,
    marginBottom: 21,
  },
  headerLeft: {
    color: BLACK100,
    ...extraLargeText,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
});
