import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { statusActions } from '../../../actions/status';
import { WHITE } from '../../../theme/colors';
import SecuritySvg from '../../../assets/icons/security-icon.svg';

const NotificationView = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleNextPage = () => {
    dispatch(
      statusActions.setAppCurrentStatus({
        parent: 'SignUp',
        sub: 'Step8',
      }),
    );
    navigation.navigate('Step8');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<SecuritySvg />}
          title="Thanks for verifying your mobile number."
          description="This lets us verify that you are you. We take your security very seriously and encrypt your information."
        />
        <Bottom label="OK, got it" onPress={handleNextPage} />
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
