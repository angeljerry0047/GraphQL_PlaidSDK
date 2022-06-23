import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openInbox } from 'react-native-email-link';
import Modal from 'react-native-modal';

import InfoPanel from '../../../components/profile/InfoPanel';
import NotificationComponent from '../../../components/home/Notification';
import { notificationActions } from '../../../actions/notification';
import {
  WHITE,
  GREEN800,
  GREY700,
  BLACK200,
  BLUE100,
} from '../../../theme/colors';
import { normalText } from '../../../theme/fonts';
import NotificationSvg from '../../../assets/icons/home/Notification-icon.svg';
import EmailSvg from '../../../assets/icons/home/Email-icon.svg';
import GraphSvg from '../../../assets/icons/home/Graph-icon.svg';
import TrophySvg from '../../../assets/icons/home/Trophy-icon.svg';

const Notification = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationData, setNotificationData] = useState([]);
  const emailIsVerified = useSelector(
    (state) => state.user.loggedUser?.attributes?.email_verified,
  );
  const { notifications } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!emailIsVerified) {
      const temp = notificationData.concat({
        message:
          'For your security, please verify the email address we have on file.',
        link: 'Verify now',
        icon: <EmailSvg />,
        index: 1,
        onLinkClick: openInbox,
      });
      setNotificationData(temp);
    }
  }, [emailIsVerified]);

  const handleSelectNotification = (item) => {
    setSelectedNotification(item);
    setIsVisible(true);
  };

  const handleCancel = () => {
    // dispatch(notificationActions.deleteNotification(selectedNotification.id));
    setIsVisible(false);
  };

  return (
    <>
      {notificationData.length > 0 ? (
        <View>
          <FlatList
            data={notificationData}
            renderItem={({ item }) => (
              <NotificationComponent
                item={item}
                onLongPress={() => handleSelectNotification(item)}
              />
            )}
            keyExtractor={(item, index) => index}
            style={styles.notificationFlatList}
            horizontal
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.icon}>
              <NotificationSvg />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.description}>
                Notifications will display here. For now, you’re all caught up!
              </Text>
            </View>
          </View>
        </View>
      )}
      <Modal
        isVisible={isVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setIsVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel
          handleDismiss={() => setIsVisible(false)}
          description="Delete this notification?"
          buttonText="Yes, delete"
          isVisibleCancel={true}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notificationFlatList: {
    paddingLeft: 20,
  },
  flatListContainer: {
    paddingRight: 40,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    paddingHorizontal: 30,
  },
  content: {
    backgroundColor: WHITE,
    padding: 28,
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: GREEN800,
    borderWidth: 1,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: GREY700,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 22,
  },
  description: {
    ...normalText,
    color: BLACK200,
    maxWidth: 180,
  },
});
