import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import Header from '../../../components/common/Header';
import Description from '../../../components/common/Description';
import { homeActions } from '../../../actions/home';
import { occurrence } from '../../../utility';
import { WHITE, GREY500, BLUE100 } from '../../../theme/colors';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import ErrorText from '../../../components/common/ErrorText';

const TransactionCancel = ({ navigation }) => {
  const { transaction, isLoading, error } = useSelector((state) => state.home);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  };

  const handleCancel = async () => {
    const token = `Bearer ${user?.jwt}`;
    dispatch(
      homeActions.transactionCancelRequest({
        transaction,
        token,
      }),
    );
  };

  const handleNeverMind = () => {
    navigation.navigate('Activity');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="Are you sure you want to cancel this transaction?" />
        <Description
          description={`Proceeding will cancel your ${
            transaction?.occurrences
          } ${occurrence(
            transaction?.transferType,
          )} for $${transaction.amount?.toLocaleString(
            'en-US',
          )}, initiated on ${moment(
            transaction?.dateOfTransfer || transaction?.startDate,
          ).format('MM/DD/YYYY')}.`}
          style={styles.description}
        />
        {!!error && <ErrorText error={error.message} />}
        <Bottom
          label="Yes, cancel transaction"
          onPress={handleCancel}
          isLoading={isLoading}>
          <Button
            label="Nevermind, don’t cancel"
            onPress={handleNeverMind}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default TransactionCancel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  selectInput: {
    marginTop: 25,
  },
  description: {
    marginBottom: 11,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
});
