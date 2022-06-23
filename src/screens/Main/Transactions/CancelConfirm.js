import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { WHITE } from '../../../theme/colors';
import TransferSvg from '../../../assets/icons/Transfer-icon.svg';

const CancelConfirm = ({ navigation }) => {
  const { transaction } = useSelector((state) => state.home);

  const handleNextPage = () => {
    navigation.navigate('TransferHome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<TransferSvg />}
          title={`$${transaction.amount?.toLocaleString(
            'en-US',
          )} transaction canceled.`}
          description="No further action is needed on your end."
        />
        <Bottom label="I’m done" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default CancelConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
