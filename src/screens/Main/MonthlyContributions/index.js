import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import Header from '../../../components/common/Header';
import Title from '../../../components/common/Title';
import TransferFund from '../../../components/home/TransferFund';

import { BLACK100, WHITE400, GREY500, BLUE100 } from '../../../theme/colors';
import { extraLargeText } from '../../../theme/fonts';
import DepositGreenSvg from '../../../assets/icons/home/deposit-icon-green-2.svg';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const MonthlyContributions = ({ navigation }) => {
  const { scheduledTransfer } = useSelector((state) => state.portfolio);

  const goBack = () => {
    navigation.pop(2);
  };

  const handleNextPage = () => {
    navigation.navigate('EditMonthlyContribution', { type: 'edit' });
  };

  const handleStop = () => {
    navigation.navigate('StopContribution');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.header}
      />
      <AppContainer>
        <Title label="Monthly portfolio contribution" />
        {scheduledTransfer && (
          <>
            <TransferFund
              text1={`$${scheduledTransfer?.amount}/month`}
              text2={`On the ${moment(scheduledTransfer?.startDate).format(
                'Do',
              )} of every month`}
              icon={<DepositGreenSvg />}
              isVisible
            />

            <Bottom
              label="Edit contribution amount"
              onPress={handleNextPage}
              buttonStyle={styles.closeButton}
              buttonTextStyle={styles.text}>
              <Button
                label="Stop monthly contributions"
                onPress={handleStop}
                style={styles.closeButton}
                textStyle={styles.text}
              />
            </Bottom>
          </>
        )}
      </AppContainer>
    </SafeAreaView>
  );
};

export default MonthlyContributions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },

  header: {
    paddingTop: 10,
  },
  headerLeft: {
    color: BLACK100,
    ...extraLargeText,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
});
