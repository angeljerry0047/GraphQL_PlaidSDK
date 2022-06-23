import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { userActions } from '../../../actions/user';
import { updateUserInformation } from '../../../graphql/mutations';
import { WHITE } from '../../../theme/colors';
import PortfolioSvg from '../../../assets/icons/portfolio-icon.svg';

const ConfirmContributionStop = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleNextPage = async () => {
    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            monthlyContribution: 0,
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          monthlyContribution: 0,
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
          icon={<PortfolioSvg />}
          title="Your change was successful."
          description="You will no longer be making monthly contributions starting next month."
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom label="I’m done" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default ConfirmContributionStop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  descriptionContainer: {
    maxWidth: 330,
  },
});
