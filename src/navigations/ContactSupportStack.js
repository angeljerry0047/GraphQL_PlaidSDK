import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import ContactSupport from '../screens/Global/ContactSupport';
import GlobalError from '../screens/Global/Error';

const ContactSupportStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
      initialRouteName="ContactSupport">
      <Stack.Screen name="ContactSupport" component={ContactSupport} />
      <Stack.Screen name="GlobalError" component={GlobalError} />
    </Stack.Navigator>
  );
};

export default ContactSupportStacks;
