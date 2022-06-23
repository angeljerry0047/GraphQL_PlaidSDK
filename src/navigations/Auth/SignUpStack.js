import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Email from '../../screens/Auth/SignUp/Email';
import Password from '../../screens/Auth/SignUp/Password';
import Notification from '../../screens/Auth/SignUp/Notification';
import FirstName from '../../screens/Auth/SignUp/FirstName';
import LastName from '../../screens/Auth/SignUp/LastName';
import MobileNum from '../../screens/Auth/SignUp/MobileNum';
import Verification from '../../screens/Auth/SignUp/Verification';
import VerificationSuccess from '../../screens/Auth/SignUp/VerificationSuccess';
import Citizenship from '../../screens/Auth/SignUp/Citizenship';
import NonCitizenship from '../../screens/Auth/SignUp/NonCitizenship';
import Address from '../../screens/Auth/SignUp/Address';
import Birthday from '../../screens/Auth/SignUp/Birthday';
import Ssn from '../../screens/Auth/SignUp/Ssn';
import Review from '../../screens/Auth/SignUp/Review';

const SignupStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="Step1">
      <Stack.Screen name="Step1" component={Email} />
      <Stack.Screen name="Step2" component={Password} />
      <Stack.Screen name="Step2b" component={Notification} />
      <Stack.Screen name="Step3" component={FirstName} />
      <Stack.Screen name="Step4" component={LastName} />
      <Stack.Screen name="Step5" component={MobileNum} />
      <Stack.Screen name="Step6" component={Verification} />
      <Stack.Screen name="Step7" component={VerificationSuccess} />
      <Stack.Screen name="Step8" component={Citizenship} />
      <Stack.Screen name="Step9" component={Address} />
      <Stack.Screen name="Step10" component={NonCitizenship} />
      <Stack.Screen name="Step11" component={Birthday} />
      <Stack.Screen name="Step12" component={Ssn} />
      <Stack.Screen name="Step13" component={Review} />
    </Stack.Navigator>
  );
};

export default SignupStacks;
