import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ConnectBankComponent from '../../../../components/common/ConnectBank';
import Loading from '../../../../components/common/Loading';
import { WHITE } from '../../../../theme/colors';

import { portfolioActions } from '../../../../actions/portfolio';

const BankEmpty = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { plaidInfoId, apex, isLoadingChangeBank } = useSelector(
    (state) => state.portfolio,
  );
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
      <ConnectBankComponent
        navigation={navigation}
        onSuccess={onSuccess}
        title="Please connect your bank account to Stackwell."
        description="To use for transferring funds in and out of your portfolio. We take your security very seriously and encrypt your information."
      />
      {isLoadingChangeBank && <Loading />}
    </SafeAreaView>
  );
};

export default BankEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
