import React from 'react';

import ConnectBankComponent from '../../components/common/ConnectBank';

const ConnectBank = ({ navigation }) => {
  const onSuccess = (success) => {
    navigation.navigate('ConfirmSchedule', { plaidData: success });
  };

  return <ConnectBankComponent navigation={navigation} onSuccess={onSuccess} />;
};

export default ConnectBank;
