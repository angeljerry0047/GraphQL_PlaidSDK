import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../../components/common/AppContainer';
import Bottom from '../../../../components/common/Bottom';
import ImageLayout from '../../../../components/common/ImageLayout';
import { WHITE } from '../../../../theme/colors';
import CloseAccountSvg from '../../../../assets/icons/home/CloseAccount.svg';

const CloseConfirm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { reason } = useSelector((state) => state.home);

  const handleNextPage = () => {
    //TODO call Action
    console.log(reason);
    navigation.navigate('ProfileSetting');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<CloseAccountSvg />}
          title="We will contact you shortly."
          description="A Stackwell support specialist will contact you to handle this further."
        />
        <Bottom label="OK, got it" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default CloseConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
