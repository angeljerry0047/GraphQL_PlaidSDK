import React from 'react';
import { StyleSheet, View } from 'react-native';

const OverlayView = ({ isLoading }) => {
  return <>{isLoading && <View style={styles.overlay} />}</>;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 99,
    flex: 1,
  },
});
export default OverlayView;
