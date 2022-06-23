import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';

import AppContainer from '../../components/common/AppContainer';
import Title from '../../components/common/Title';
import Bottom from '../../components/common/Bottom';
import TextInput from '../../components/common/TextInput';
import Header from '../../components/common/Header';
import Overlay from '../../components/common/Overlay';
import Loading from '../../components/common/Loading';
import PlaidButton from '../../components/profile/PlaidButton';
import { WHITE, BLUE100 } from '../../theme/colors';
import Description from '../../components/common/Description';
import ErrorText from '../../components/common/ErrorText';
import InfoPanel from '../../components/profile/InfoPanel';
import { portfolioActions } from '../../actions/portfolio';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';
import EditSvg from '../../assets/icons/edit-icon.svg';
import InfoSvg from '../../assets/icons/large-Info-icon.svg';

const ConfirmSchedule = ({ route, navigation }) => {
  const {
    error,
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
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.plaidData) {
      onSuccess(route.params?.plaidData);
    }
  }, [route]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;

    const apexUserInfoId = apex.id;

    const payload = {
      plaidInfoId,
      token,
      account: accounts?.[0],
      apexUserInfoId,
      plaidAccessToken: accessToken,
      monthlyContribution: user?.monthlyContribution || 0,
      scheduledMonthlyAmount: user?.monthlyContribution + 1,
    };
    dispatch(portfolioActions.makeTransferRequest(payload));
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
      from: 'ConfirmSchedule',
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
          description={`We'll withdraw $${
            parseInt(user.monthlyContribution, 10) + 1
          } today, and then $${
            parseInt(user.monthlyContribution, 10) + 1
          } on a monthly recurring basis going forward.`}
        />
        {error && (
          <ErrorText
            error="The amount due today exceeds your bank account’s available funds."
            errorContainer={styles.errorContainer}
          />
        )}

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
          text={`$${user.monthlyContribution}`}
          containerStyle={styles.textInput}
          icon={<EditSvg />}
          editable={false}
          onPress={() =>
            navigation.push('Contribution', {
              from: 'confirmSchedule',
            })
          }
        />
        <TextInput
          label="Monthly portfolio optimization"
          text="$1"
          containerStyle={styles.textInput}
          editable={false}
          icon={<InfoSvg />}
          onPress={() => setInfoModalVisible(true)}
        />
        <Bottom
          label={`Make first $${
            parseInt(user.monthlyContribution, 10) + 1
          } transfer`}
          onPress={handleNextPage}
          isLoading={plaidLoading || isLoading}
        />
      </AppContainer>
      <Overlay isLoading={isLoading} />
      <Modal
        isVisible={isInfoModalVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setInfoModalVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel
          handleDismiss={() => setInfoModalVisible(false)}
          description="For $1/month, we'll invest your funds and help you grow your wealth."
        />
      </Modal>
    </SafeAreaView>
  );
};

export default ConfirmSchedule;

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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
