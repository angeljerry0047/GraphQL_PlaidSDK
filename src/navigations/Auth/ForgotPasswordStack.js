import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import AskEmail from '../../screens/Auth/ForgotPassword/AskEmail';
import Confirmation from '../../screens/Auth/ForgotPassword/Confirmation';
import NewPassword from '../../screens/Auth/ForgotPassword/NewPassword';
import ResetSuccess from '../../screens/Auth/ForgotPassword/ResetSuccess';

const ForgotPasswordStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="AskEmail">
      <Stack.Screen name="AskEmail" component={AskEmail} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="ResetSuccess" component={ResetSuccess} />
    </Stack.Navigator>
  );
};

export default ForgotPasswordStacks;
