import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import HTML from 'react-native-render-html';
// import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// import { reactNativeRenderer } from '@contentful/rich-text-react-renderer';

import Description from '../common/Description';
import Button from '../common/Button';
import {
  WHITE,
  BLACK100,
  GREEN800,
  GREY500,
  BLUE100,
} from '../../theme/colors';
import { normalText, normalBoldText, largeBoldText } from '../../theme/fonts';

const InfoPanel = ({
  handleDismiss,
  description,
  children,
  title,
  buttonText = 'OK, got it',
  isVisibleCancel = false,
  cancelLabel = 'Cancel',
  handleCancel,
}) => (
  <View style={styles.infoPanel}>
    {!!title && <Text style={styles.title}>{title}</Text>}
    <Description
      textStyle={styles.description}
      description={description}
      style={styles.descriptionContainer}>
      {children}
    </Description>
    {/* <HTML source={{ html: description }} contentWidth={width} /> */}
    <Button label={buttonText} onPress={handleDismiss} />
    {isVisibleCancel && (
      <Button
        label={cancelLabel}
        onPress={handleCancel}
        style={styles.cancelBtn}
        textStyle={styles.cancelBtnText}
      />
    )}
  </View>
);

export default InfoPanel;

const styles = StyleSheet.create({
  description: {
    ...normalText,
    color: BLACK100,
  },
  descriptionContainer: {
    borderBottomColor: GREEN800,
    borderBottomWidth: 1,
    paddingBottom: 30,
    marginBottom: 30,
    maxWidth: '100%',
  },
  infoPanel: {
    backgroundColor: WHITE,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 50,
  },
  title: {
    marginBottom: 4,
    ...normalBoldText,
    color: BLACK100,
    paddingTop: 20,
  },
  cancelBtn: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  cancelBtnText: {
    ...largeBoldText,
    color: BLUE100,
  },
});
