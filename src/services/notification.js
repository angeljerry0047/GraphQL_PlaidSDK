import OneSignal from 'react-native-onesignal';

import { ONE_SIGNAL_KEY } from '../config';
import * as NavigationService from './navigation/NavigationService';

//OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId(ONE_SIGNAL_KEY);
//END OneSignal Init Code

const NotificationService = (from) => {
  OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    console.log('Prompt response:', response);
    if (from === 'signup') {
      NavigationService.navigate('Step3');
    }
  });

  OneSignal.addPermissionObserver((response) => {
    console.log('addPermissionObserver:', response);
  });

  OneSignal.getDeviceState((response) => {
    console.log('get deviceState:', response);
  });
  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification);
  });
};

export default NotificationService;
