import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';
import Toast, { BaseToast } from 'react-native-toast-message';
import UserInactivity from 'react-native-user-inactivity';
import BackgroundTimer from 'react-native-background-timer';

const Stack = createStackNavigator();

import LoginStack from './Auth/LoginStack';
import SignUpStack from './Auth/SignUpStack';
import ForgotPasswordStack from './Auth/ForgotPasswordStack';
import PortfolioStack from './PortfolioStack';
import HomeStack from './HomeStack';
import WelcomeStack from './WelcomeStack';
import ContactSupportStack from './ContactSupportStack';
import * as NavigationService from '../services/navigation/NavigationService';
import { messageActions } from '../actions/message';
import { userActions } from '../actions/user';

const defaultScreenOptions = { headerShown: false };

const AppNavigator = () => {
  const navigationRef = useRef(null);
  const routeNameRef = useRef(null);
  const { text1, text2, type } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);

  useEffect(() => {
    NavigationService.setNavigator(navigationRef.current);
  }, []);

  useEffect(() => {
    if (!text1 || !text2 || !type) {
      return;
    }
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 60,
      onHide: () => resetMessage(),
      onPress: () => resetMessage(),
    });
  }, [text1, text2, type]);

  const resetMessage = () => {
    dispatch(
      messageActions.setMessage({
        type: '',
        message: null,
      }),
    );
  };

  const toastConfig = {
    info: ({ text1, text2, props, ...rest }) => (
      <BaseToast
        {...rest}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.text1}
        text2Style={styles.text2}
        text1={text1}
        text2={text2}
      />
    ),
  };

  const onReady = () => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    console.log('Running', routeNameRef.current);
  };

  const onStateChange = async () => {
    const prev = routeNameRef.current;
    const current = navigationRef.current.getCurrentRoute().name;
    console.log('Current: ', current);
    console.log('Prev: ', prev);
    if (prev !== current) {
      console.log('attempting');
      await analytics().logScreenView({
        screen_name: current,
        screen_class: current,
      });
      console.log('tracked screen: ', current);
    }

    routeNameRef.current = current;
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <UserInactivity
      timeForInactivity={1000 * 60 * 15}
      timeoutHandler={BackgroundTimer}
      isActive={active}
      onAction={(isActive) => {
        console.log('isActive=======>', isActive);
        setActive(isActive);
        if (!isActive && user.jwt) {
          handleLogout();
        }
      }}>
      <NavigationContainer
        screenOptions={defaultScreenOptions}
        ref={navigationRef}
        onReady={onReady}
        onStateChange={onStateChange}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Welcome" component={WelcomeStack} />
          <Stack.Screen name="Login" component={LoginStack} />
          <Stack.Screen name="SignUp" component={SignUpStack} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordStack} />
          <Stack.Screen name="Portfolio" component={PortfolioStack} />
          <Stack.Screen name="ContactSupport" component={ContactSupportStack} />
          <Stack.Screen
            name="Home"
            options={{ gestureEnabled: false }}
            component={HomeStack}
          />
        </Stack.Navigator>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </UserInactivity>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    borderLeftColor: '#004085',
    backgroundColor: '#cce5ff',
  },
  text1: {
    fontSize: 15,
    fontWeight: '600',
    color: '#004085',
  },
  text2: {
    color: '#004085',
    fontSize: 12,
  },
  contentContainer: { paddingHorizontal: 15 },
});
