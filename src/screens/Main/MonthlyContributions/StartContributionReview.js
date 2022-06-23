import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import Loading from '../../../components/common/Loading';
import Overlay from '../../../components/common/Overlay';
import PlaidButton from '../../../components/profile/PlaidButton';
import { WHITE, GREY500, BLUE100 } from '../../../theme/colors';
import Description from '../../../components/common/Description';
import { portfolioActions } from '../../../actions/portfolio';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import EditSvg from '../../../assets/icons/edit-icon.svg';

const StartContributionReview = ({ route, navigation }) => {
  const {
    accounts,
    accessToken,
    linkToken,
    plaidInfoId,
    apex,
    isLoading,
    plaidLoading,
  } = useSelector((state) => state.portfolio);

  const { user } = useSelector((state) => state.user);
  const [editableBank, setEditableBank] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.plaidData) {
      onSuccess(route.params?.plaidData);
    }
  }, [route.params]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    if (route.params?.from === 'connectBank') {
      const apexUserInfoId = apex.id;

      const payload = {
        plaidInfoId,
        token,
        account: accounts?.[0],
        apexUserInfoId,
        plaidAccessToken: accessToken,
        monthlyContribution: +user?.newMonthlyContribution || 0,
        scheduledMonthlyAmount: user?.newMonthlyContribution + 1,
        from: 'home',
      };
      dispatch(portfolioActions.makeTransferRequest(payload));
    } else {
      const payload = {
        token,
        monthlyContribution: +user?.newMonthlyContribution,
      };
      dispatch(portfolioActions.createTransferRequest(payload));
    }
  };

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
      from: 'StartContributionReview',
      account_id: accounts[0].id,
      email: user.email,
    };
    dispatch(portfolioActions.exchangePlaidPublicTokenRequest(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="Review contribution schedule" />
        <Description
          description={`We'll withdraw $${parseInt(
            user.newMonthlyContribution,
            10,
          )} today, and then $${parseInt(
            user.newMonthlyContribution,
            10,
          )} on a monthly recurring basis going forward.`}
        />
        <TextInput
          label="Transfer from"
          text={
            accounts.length > 0 ? `${accounts[0].name} ${accounts[0].mask}` : ''
          }
          containerStyle={styles.textInput}
          icon={
            <PlaidButton onSuccess={onSuccess} linkToken={linkToken}>
              <EditSvg />
            </PlaidButton>
          }
          editable={editableBank}
          onPress={() => setEditableBank(true)}
        />
        <TextInput
          label="Monthly portfolio contribution"
          text={`$${user.newMonthlyContribution}`}
          containerStyle={styles.textInput}
          icon={<EditSvg />}
          editable={false}
          onPress={() => navigation.goBack()}
        />
        <Bottom
          label={`Make first $${parseInt(
            user.newMonthlyContribution,
            10,
          )} transfer`}
          onPress={handleNextPage}
          isLoading={isLoading}
          isDisabled={plaidLoading}>
          <Button
            label="Cancel"
            onPress={goBack}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
      {plaidLoading && <Loading backgroundColor="transparent" />}
      <Overlay isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default StartContributionReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  textInput: {
    marginTop: 37,
  },
  errorContainer: {
    marginTop: 36,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
});
