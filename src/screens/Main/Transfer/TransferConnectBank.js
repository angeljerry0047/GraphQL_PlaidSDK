import React from 'react';

import ConnectBankComponent from '../../../components/common/ConnectBank';

const TransferConnectBank = ({ navigation, route }) => {
  const onSuccess = (success) => {
    navigation.navigate(route.params.where, {
      plaidData: success,
      from: route.params.from,
    });
  };

  return (
    <ConnectBankComponent
      navigation={navigation}
      onSuccess={onSuccess}
      title="Please connect your bank account to Stackwell."
      description="To use for transferring funds in and out of your portfolio. We take your security very seriously and encrypt your information."
    />
  );
};

export default TransferConnectBank;
