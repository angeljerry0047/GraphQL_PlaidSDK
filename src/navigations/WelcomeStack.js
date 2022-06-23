import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Welcome from '../screens/Auth/Welcome';
import Startup from '../screens/Auth/Welcome/Startup';

const WelcomeStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
      initialRouteName="Startup">
      <Stack.Screen name="Startup" component={Startup} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default WelcomeStacks;
