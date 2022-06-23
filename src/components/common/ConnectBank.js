import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RippleLoader } from 'react-native-indicator';

import AppContainer from './AppContainer';
import Bottom from './Bottom';
import ImageLayout from './ImageLayout';
import PlaidButton from '../profile/PlaidButton';
import { portfolioActions } from '../../actions/portfolio';
import { largeBoldText } from '../../theme/fonts';
import { WHITE, GREY500, BLUE100 } from '../../theme/colors';
import ConnectBankSvg from '../../assets/icons/Connect-bank-icon.svg';

const ConnectBank = ({
  navigation,
  onSuccess,
  title,
  description,
  buttonText,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { linkToken, isLoadingPlaidLinkToken } = useSelector(
    (state) => state.portfolio,
  );

  useEffect(() => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;

    const payload = { token };
    dispatch(portfolioActions.getPlaidLinkTokenRequest(payload));
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<ConnectBankSvg />}
          title={title || 'Connect your bank account.'}
          description={
            description ||
            'To use for your monthly contributions and monthly $1 charge.'
          }
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom
          label="Back"
          onPress={goBack}
          buttonStyle={styles.backButtonStyle}
          buttonTextStyle={styles.text}
          position="top">
          <PlaidButton
            linkToken={linkToken}
            onSuccess={onSuccess}
            plaidButtonStyle={styles.plaidButton}>
            {isLoadingPlaidLinkToken ? (
              <View style={styles.loader}>
                <RippleLoader
                  color="rgb(255, 255, 255, 0.8)"
                  strokeWidth={2}
                  frequency={1000}
                  size={30}
                />
              </View>
            ) : (
              <Text style={styles.plaidButtonText}>
                {buttonText || 'Continue'}
              </Text>
            )}
          </PlaidButton>
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default ConnectBank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  plaidButton: {
    marginBottom: 16,
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
  backButtonStyle: {
    backgroundColor: GREY500,
  },
  descriptionContainer: {
    maxWidth: 330,
  },
  loader: {
    position: 'absolute',
  },
});
