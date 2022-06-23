import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { BLUE200, WHITE } from '../../theme/colors';
import { normalText, mediumText } from '../../theme/fonts';
import ForwardSvg from '../../assets/icons/home/forward-chevron-icon.svg';

const Notification = ({ item, onLongPress }) => {
  const { message, link, icon, onLinkClick, launchURL } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => onLongPress && onLongPress()}
      onPress={onLinkClick}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.description}>{message}</Text>
        <View style={styles.bottom}>
          <Text style={styles.link}>{link}</Text>
          <View style={styles.forward}>
            <ForwardSvg />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLUE200,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 24,
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: BLUE200,
    borderWidth: 1,
    width: 308,
    marginHorizontal: 10,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    ...normalText,
    color: WHITE,
    opacity: 0.94,
    marginTop: 1,
  },
  link: {
    ...mediumText,
    fontWeight: '600',
    marginRight: 8,
    color: WHITE,
    opacity: 0.94,
  },
  bottom: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 22,
  },
  forward: {
    marginTop: 2,
  },
});
