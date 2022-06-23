import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { API, graphqlOperation } from 'aws-amplify';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { userActions } from '../../../actions/user';
import { updateUserInformation } from '../../../graphql/mutations';

import { WHITE } from '../../../theme/colors';
import TransferConfirmSvg from '../../../assets/icons/home/TransferConfirm-icon.svg';

const ConfirmContributionReview = ({ navigation }) => {
  const { scheduledTransfer } = useSelector((state) => state.portfolio);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleNextPage = async () => {
    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            monthlyContribution: user.newMonthlyContribution,
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          monthlyContribution: user.newMonthlyContribution,
          newMonthlyContribution: null,
          previousMonthlyContribution: null,
        }),
      );
      navigation.navigate('TransferHome');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<TransferConfirmSvg />}
          title="Your change was successful."
          description={`Your monthly contribution was changed from $${
            user.previousMonthlyContribution
          } to $${user.newMonthlyContribution}. The next deposit is on ${moment(
            scheduledTransfer.startDate,
          )
            .add(1, 'month')
            .format('MM/DD/YYYY')}.`}
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom label="I’m done" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default ConfirmContributionReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  descriptionContainer: {
    maxWidth: 330,
  },
});
