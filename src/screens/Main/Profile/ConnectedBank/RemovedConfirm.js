import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import AppContainer from '../../../../components/common/AppContainer';
import Bottom from '../../../../components/common/Bottom';
import ImageLayout from '../../../../components/common/ImageLayout';
import { updateUserInformation } from '../../../../graphql/mutations';
import { userActions } from '../../../../actions/user';
import { WHITE, GREY500, BLUE100 } from '../../../../theme/colors';
import ConnectbankSvg from '../../../../assets/icons/Connect-bank-icon.svg';

const RemoveConfirm = ({ route, navigation }) => {
  const accounts = route.params;
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
      navigation.navigate('ProfileSetting');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<ConnectbankSvg />}
          title={`****${accounts[0]?.mask} is now removed.`}
          description={
            'You will no longer be making monthly contributions to your portfolio.'
          }
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom label="I’m done" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default RemoveConfirm;

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
  descriptionContainer: {
    maxWidth: 330,
  },
});
