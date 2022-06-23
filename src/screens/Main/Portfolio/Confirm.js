import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { WHITE, GREY500, BLUE100 } from '../../../theme/colors';
import TransferConfirmSvg from '../../../assets/icons/portfolio-icon.svg';
import { useSelector } from 'react-redux';

const TransferConfirm = ({ navigation }) => {
  const handleNextPage = () => {
    navigation.navigate('TransferHome');
  };

  const { portfolio } = useSelector((state) => state.portfolio);

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<TransferConfirmSvg />}
          title="Your change was successful."
          description={`Your portfolio type was changed from ${portfolio?.oldType} to ${portfolio?.newType}.`}
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom label="I'm done" onPress={handleNextPage} />
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
