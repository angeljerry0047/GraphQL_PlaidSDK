import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import { WHITE, GREY500, BLUE100 } from '../../../theme/colors';
import { portfolioActions } from '../../../actions/portfolio';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const EditContributionReview = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading, plaidLoading, scheduledTransfer } = useSelector(
    (state) => state.portfolio,
  );

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;

    const payload = {
      token,
      monthlyContribution: user?.newMonthlyContribution,
      depositId: scheduledTransfer.id,
    };
    if (route.params?.from === 'stop') {
      // TODO API call
      dispatch(portfolioActions.cancelTransferRequest(payload));
      return;
    }

    dispatch(portfolioActions.updateTransferRequest(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="Review change to monthly contribution" />
        <View style={styles.content}>
          <TextInput
            label="Current monthly contribution"
            text={`$${scheduledTransfer.amount}`}
            editable={false}
            onPress={() =>
              navigation.push('Contribution', {
                from: 'confirmSchedule',
              })
            }
          />
          <TextInput
            label="New monthly contribution"
            text={`$${
              route.params?.from === 'stop' ? 0 : user.newMonthlyContribution
            }`}
            containerStyle={styles.textInput}
            editable={false}
          />
        </View>
        <Bottom
          label="Make change"
          onPress={handleNextPage}
          isLoading={isLoading || plaidLoading}>
          <Button
            label="Cancel"
            onPress={goBack}
            style={styles.closeButton}
            textStyle={styles.text}
            disabled={isLoading || plaidLoading}
          />
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default EditContributionReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  content: {
    marginTop: 51,
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
});
