import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { WHITE, GREY500, BLUE100 } from '../../../theme/colors';
import TransferConfirmSvg from '../../../assets/icons/home/TransferConfirm-icon.svg';

const TrustedContactSuccess = ({ route, navigation }) => {
  const handleNextPage = () => {
    navigation.navigate('TransferHome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<TransferConfirmSvg />}
          title="Trusted contact added."
          description="Your trusted contact will be updated in our systems within 24 hours."
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom label="I’m done" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default TrustedContactSuccess;

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
