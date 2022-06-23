import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { WHITE, BLUE100, BLUE300, GREY900 } from '../../../theme/colors';
import { H1, smallMediumText } from '../../../theme/fonts';

const LogoutModal = ({ navigation, isVisible, setIsVisible, logout }) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      transparent={true}
      style={styles.modal}
      backdropColor={BLUE100}
      backdropOpacity={0.25}
      onBackdropPress={() => setIsVisible(false)}>
      <View>
        <View style={styles.item}>
          <View style={styles.commentWrapper}>
            <Text style={styles.comment}>
              Are you sure you want to log out?
            </Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.text}>Log out</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <View style={[styles.item, styles.bottom]}>
            <Text style={styles.text}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
  },
  commentWrapper: {
    borderBottomColor: 'rgba(60, 60, 67, 0.15)',
    borderBottomWidth: 0.5,
  },
  comment: {
    paddingVertical: 14,
    color: GREY900,
    ...smallMediumText,
  },
  text: {
    ...H1,
    color: BLUE300,
    paddingVertical: 17,
  },
  bottom: {
    marginTop: 8,
  },
  modal: {
    justifyContent: 'flex-end',
    marginBottom: 34,
    marginHorizontal: 8,
  },
});
