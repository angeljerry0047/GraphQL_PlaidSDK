import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { WHITE } from '../../../theme/colors';
import PortfolioSvg from '../../../assets/icons/portfolio-icon.svg';

const ResetSuccess = ({ navigation }) => {
  const handleNextPage = () => {
    navigation.navigate('TransferHome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<PortfolioSvg />}
          title="Your change was successful."
          description="You may now use your new password to log into the Stackwell app."
        />
        <Bottom label="I’m done" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default ResetSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
