import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import Loading from '../../../components/common/Loading';
import { homeActions } from '../../../actions/home';
import {
  capitalizeFirstLetter,
  occurrence,
  transferState,
} from '../../../utility';
import { WHITE, GREY500, BLUE100, BLACK200 } from '../../../theme/colors';
import { smallMediumText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const TransactionDetail = ({ navigation, route }) => {
  const { transaction, isLoading } = useSelector((state) => state.home);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.id) {
      dispatch(
        homeActions.getTransactionDetailRequest({
          ...route.params,
          token: `Bearer ${user?.jwt}`,
        }),
      );
    }
  }, [route.params]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.navigate('TransactionCancel');
  };
  const handleRetry = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.containerStyle}
      />
      {isLoading && <Loading />}
      <AppContainer>
        <Title
          label={`${capitalizeFirstLetter(
            transaction?.occurrences,
          )} ${occurrence(transaction?.transferType)}`}
          style={styles.title}
        />
        <TextInput
          label="Status"
          text={
            transaction.transferState
              ? transferState(transaction.transferState)
              : 'Processing'
          }
          containerStyle={styles.textInput}
          editable={false}
        />
        <TextInput
          label="Transferred from"
          text={
            occurrence(transaction.transferType) === 'withdrawal'
              ? 'Stackwell portfolio'
              : transaction.bankAccountOwnerName
          }
          containerStyle={styles.textInput}
          editable={false}
        />
        <TextInput
          label="Transferred to"
          text={
            occurrence(transaction.transferType) === 'withdrawal'
              ? transaction.bankAccountOwnerName
              : 'Stackwell portfolio'
          }
          containerStyle={styles.textInput}
          editable={false}
        />
        <TextInput
          label="Amount"
          text={`$${transaction.amount?.toLocaleString('en-US')}` || '$0.00'}
          containerStyle={styles.textInput}
          editable={false}
        />
        <TextInput
          label="Date"
          text={moment(
            transaction?.dateOfTransfer || transaction?.startDate,
          ).format('MM/DD/YYYY')}
          containerStyle={styles.textInput}
          editable={false}
        />
        {transaction?.id && (
          <Text style={styles.comment}>
            {`Your transaction ID is #${transaction.id}.`}
          </Text>
        )}

        {transferState(transaction.transferState) === 'Processing' && (
          <Bottom hidden>
            <Button
              label="Cancel"
              onPress={handleCancel}
              style={styles.closeButton}
              textStyle={styles.text}
            />
          </Bottom>
        )}
        {transferState(transaction.transferState) === 'Failed' && (
          <Bottom label="Retry" onPress={handleRetry} isLoading={isLoading} />
        )}
      </AppContainer>
    </SafeAreaView>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  containerStyle: {
    paddingTop: 10,
  },
  title: {
    marginBottom: 14,
  },
  textInput: {
    marginTop: 37,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  comment: {
    ...smallMediumText,
    marginTop: 36,
    color: BLACK200,
  },
});
