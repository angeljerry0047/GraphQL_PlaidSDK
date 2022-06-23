import React from 'react';
import { View } from 'react-native';
import { PlaidLink } from 'react-native-plaid-link-sdk';

const PlaidButton = ({ linkToken, onSuccess, plaidButtonStyle, children }) => {
  return (
    <PlaidLink
      tokenConfig={{
        token: linkToken,
      }}
      onSuccess={onSuccess}>
      <View style={plaidButtonStyle}>{children}</View>
    </PlaidLink>
  );
};

export default PlaidButton;
