import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ConnectBankComponent from '../../../components/common/ConnectBank';
import Loading from '../../../components/common/Loading';
import { portfolioActions } from '../../../actions/portfolio';

const ConnectBank = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const {
    accounts,
    accessToken,
    linkToken,
    plaidInfoId,
    apex,
    isLoading,
    plaidLoading,
    isLoadingChangeBank,
  } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();

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
      router: 'StartContributionReview',
      from: 'connectBank',
      plaidData: success,
    };
    dispatch(portfolioActions.changeBankAccountRequest(payload));

    // navigation.navigate('StartContributionReview', {
    //   plaidData: success,
    //   from: 'connectBank',
    // });
  };

  return (
    <>
      <ConnectBankComponent
        navigation={navigation}
        onSuccess={onSuccess}
        title="Please connect your bank account to Stackwell."
        description="To use for transferring funds in and out of your portfolio. We take your security very seriously and encrypt your information."
      />
      {isLoadingChangeBank && <Loading />}
    </>
  );
};

export default ConnectBank;
