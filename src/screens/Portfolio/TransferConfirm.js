import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../components/common/AppContainer';
import Bottom from '../../components/common/Bottom';
import ImageLayout from '../../components/common/ImageLayout';
import { WHITE } from '../../theme/colors';
import TransferSvg from '../../assets/icons/Transfer-icon.svg';
import { statusActions } from '../../actions/status';

const TransferConfirm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleNextPage = () => {
    dispatch(
      statusActions.setAppCurrentStatus({
        parent: 'Home',
        sub: 'TransferHome',
      }),
    );
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<TransferSvg />}
          title="You’re off to the races!"
          description={`Your $${
            parseInt(user.monthlyContribution, 10) + 1
          } transfer will be processed within 3 business days.`}
        />
        <Bottom label="Start using Stackwell" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default TransferConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
