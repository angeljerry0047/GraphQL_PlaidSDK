import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import ImageLayout from '../../../components/common/ImageLayout';
import { WHITE, GREY500, BLUE100 } from '../../../theme/colors';
import TransferConfirmSvg from '../../../assets/icons/home/TransferConfirm-icon.svg';

const TransferConfirm = ({ route, navigation }) => {
  const { amount } = useSelector((state) => state.home);

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    navigation.navigate('TransferHome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<TransferConfirmSvg />}
          title={`$${Number(amount).toLocaleString(
            'en-US',
          )} transfer submitted.`}
          description={
            route.params.from === 'transferIn'
              ? 'This transfer will be reflected in your portfolio within 1-2 business days.'
              : 'This transfer will be completed within 3-5 business days.'
          }
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom label="I’m done" onPress={handleNextPage}>
          <Button
            label="Cancel transfer"
            onPress={goBack}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
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
