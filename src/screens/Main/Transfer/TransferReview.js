import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import Label from '../../../components/common/Label';
import { homeActions } from '../../../actions/home';
import { WHITE400, BLACK200, GREY500, BLUE100 } from '../../../theme/colors';
import { verySmallText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import EditSvg from '../../../assets/icons/edit-icon.svg';

const TransferReview = ({ route, navigation }) => {
  const [isTransferIn, setTransferIn] = useState(true);
  const { accounts } = useSelector((state) => state.portfolio);
  const { amount, isLoading } = useSelector((state) => state.home);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params.from === 'transferOut') {
      setTransferIn(false);
      return;
    }
  }, [route]);

  const goBack = () => {
    navigation.goBack();
  };

  const goCancel = () => {
    navigation.navigate('TransferHome');
  };

  const handleNextPage = () => {
    const token = `Bearer ${user?.jwt}`;
    if (isTransferIn) {
      dispatch(
        homeActions.createDepositRequest({
          data: {
            memo: `${accounts[0]?.name} ${accounts[0]?.mask} deposit`,
            amount,
          },
          token,
          from: route.params.from,
        }),
      );
      return;
    }
    dispatch(
      homeActions.createWithdrawalRequest({
        data: {
          memo: `${accounts[0]?.name} ${accounts[0]?.mask} withdrawal`,
          amount,
          isFullDisbursement: false,
        },
        token,
        from: route.params.from,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.headerContainer}
      />
      <AppContainer>
        <Title label="Review transfer" style={styles.title} />
        {isTransferIn ? (
          <>
            <TextInput
              label="Transfer from"
              text={`${accounts[0]?.name || ''} ${accounts[0]?.mask || ''}`}
              containerStyle={styles.textInput}
              editable={false}
            />
            <TextInput
              label="Transfer to"
              text="Stackwell portfolio"
              containerStyle={styles.textInput}
              editable={false}
            />
          </>
        ) : (
          <>
            <TextInput
              label="Transfer from"
              text="Stackwell portfolio"
              containerStyle={styles.textInput}
              editable={false}
            />
            <TextInput
              label="Transfer to"
              text={`${accounts[0]?.name || ''} ${accounts[0]?.mask || ''}`}
              containerStyle={styles.textInput}
              editable={false}
            />
          </>
        )}
        <TextInput
          label="Transfer amount"
          text={`$${Number(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          containerStyle={styles.textInput}
          icon={<EditSvg />}
          editable={false}
          onPress={() =>
            navigation.push('TransferAmount', { from: route.params.from })
          }
        />
        <Label
          label={`If this transfer is submitted before 3:00 pm CT, processing will start today and be reflected in your portfolio within ${
            isTransferIn ? '1-2' : '3-5'
          } business days. Otherwise processing will start on the next business day.`}
          style={styles.labelContainer}
          textStyle={styles.label}
        />
        <Bottom
          label="Make transfer"
          onPress={handleNextPage}
          isLoading={isLoading}>
          <Button
            label="Cancel"
            onPress={goCancel}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default TransferReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  headerContainer: {
    paddingTop: 10,
  },
  title: {
    marginBottom: 14,
  },
  textInput: {
    marginTop: 37,
  },
  address: {
    ...verySmallText,
    color: BLACK200,
    marginTop: 10,
    marginBottom: 37,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  labelContainer: {
    marginTop: 36,
  },
  label: {
    fontWeight: '500',
    letterSpacing: 0,
  },
});
