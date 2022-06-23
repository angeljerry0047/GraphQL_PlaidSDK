import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { WHITE } from '../../../theme/colors';
import TransferSvg from '../../../assets/icons/Transfer-icon.svg';

const NotificationView = ({ navigation, route }) => {
  const handleNextPage = () => {
    navigation.navigate('PersonalInfo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<TransferSvg />}
          title="Your change was successful."
          description={route.params.description}
        />
        <Bottom label="I’m done" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default NotificationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
