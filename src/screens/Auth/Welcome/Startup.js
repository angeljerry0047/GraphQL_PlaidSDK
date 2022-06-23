import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { BLACK100, WHITE } from '../../../theme/colors';
import { extraLargeText } from '../../../theme/fonts';

const { height } = Dimensions.get('window');
const yMovement = 70;
const lineHeightAdjustment = 34;
const mainAnimationDuration = 1200;
const initialDelay = 100;
const secondLineDelay = initialDelay + 300;
const navigateTimer = mainAnimationDuration + secondLineDelay + 500;
const easingFunction = Easing.bezier(0.23, 1.25, 0.46, 1);

const Startup = ({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const text1 = useRef(new Animated.Value(0))?.current;
  const text2 = useRef(new Animated.Value(0))?.current;
  const opacity1 = useRef(new Animated.Value(0))?.current;
  const opacity2 = useRef(new Animated.Value(0))?.current;

  useEffect(() => {
    Animated.timing(text1, {
      toValue: 1,
      duration: mainAnimationDuration,
      delay: initialDelay,
      easing: easingFunction,
      useNativeDriver: true,
    }).start();
  }, [text1]);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(secondLineDelay),
      Animated.timing(text2, {
        toValue: 1,
        duration: mainAnimationDuration,
        easing: easingFunction,
        useNativeDriver: true,
      }),
    ]).start();
  }, [text2]);

  useEffect(() => {
    Animated.timing(opacity1, {
      toValue: 1,
      duration: mainAnimationDuration,
      delay: initialDelay,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [opacity1]);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(secondLineDelay),
      Animated.timing(opacity2, {
        toValue: 1,
        duration: mainAnimationDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity2]);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, navigateTimer);
  }, []);

  const text1YVal = text1.interpolate({
    inputRange: [0, 1],
    outputRange: [
      height / 2 + yMovement - lineHeightAdjustment,
      height / 2 - lineHeightAdjustment,
    ],
  });
  const text1Animation = {
    opacity: opacity1,
    transform: [
      {
        translateY: text1YVal,
      },
    ],
  };

  const text2YVal = text2.interpolate({
    inputRange: [0, 1],
    outputRange: [
      height / 2 + yMovement - lineHeightAdjustment,
      height / 2 - lineHeightAdjustment,
    ],
  });
  const text2Animation = {
    opacity: opacity2,
    transform: [
      {
        translateY: text2YVal,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={text1Animation}>
        <Text style={styles.text}>Your journey to wealth</Text>
      </Animated.View>
      <Animated.View style={text2Animation}>
        <Text style={styles.text}>accumulation starts here.</Text>
      </Animated.View>
    </View>
  );
};

export default Startup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 30,
  },
  text: {
    ...extraLargeText,
    color: BLACK100,
    textAlign: 'center',
  },
});
