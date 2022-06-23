import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReConnectBankComponent from '../../../../components/common/ReConnectBank';
import { portfolioActions } from '../../../../actions/portfolio';

const ReConnectBank = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { plaidInfoId, apex } = useSelector((state) => state.portfolio);

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
    <ReConnectBankComponent navigation={navigation} onSuccess={onSuccess} />
  );
};

export default ReConnectBank;
