import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import AppContainer from '../../../../components/common/AppContainer';
import Bottom from '../../../../components/common/Bottom';
import Button from '../../../../components/common/Button';
import ImageLayout from '../../../../components/common/ImageLayout';
import { WHITE, GREY500, BLUE100 } from '../../../../theme/colors';
import ConnectbankSvg from '../../../../assets/icons/Connect-bank-icon.svg';

const ConnectedConfirm = ({ route, navigation }) => {
  const { accounts } = useSelector((state) => state.portfolio);
  const handleNextPage = () => {
    navigation.navigate('ProfileSetting');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<ConnectbankSvg />}
          title={`****${accounts[0]?.mask} is now connected.`}
          description={
            'This bank account will now be used for your monthly portfolio contributions.'
          }
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom label="I’m done" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default ConnectedConfirm;

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
