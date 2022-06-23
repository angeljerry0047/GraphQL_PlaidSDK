import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Button from '../../../components/common/Button';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { userActions } from '../../../actions/user';
import { WHITE, GREY500, BLUE100 } from '../../../theme/colors';
import NotificationSvg from '../../../assets/icons/notification-icon.svg';
// import NotificationService from '../../../services/notification';

const NotificationView = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleCheckPermission = () => {
    // NotificationService('signup');
    dispatch(
      userActions.setUserInfo({
        appStatus: {
          parent: 'SignUp',
          sub: 'Step3',
        },
      }),
    );
  };

  const handleNextPage = () => {
    dispatch(
      userActions.setUserInfo({
        appStatus: {
          parent: 'SignUp',
          sub: 'Step3',
        },
      }),
    );
    navigation.navigate('Step3');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<NotificationSvg />}
          title="Want money updates?"
          description="Get important and interesting notifications about your investment progress."
        />
        <Bottom label="OK" onPress={handleCheckPermission}>
          <Button
            label="No thanks"
            onPress={handleNextPage}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
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
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
});
