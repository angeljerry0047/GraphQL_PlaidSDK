import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';
import SplashScreen from 'react-native-splash-screen';
import { Auth, API, graphqlOperation } from 'aws-amplify';
// import OneSignal from 'react-native-onesignal';

import AppLayout from '../../../components/common/AppLayout';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import TextInput from '../../../components/common/TextInput';
import ErrorText from '../../../components/common/ErrorText';
import Overlay from '../../../components/common/Overlay';
import { validateEmail } from '../../../utility';
import { userActions } from '../../../actions/user';
import { portfolioActions } from '../../../actions/portfolio';
import { homeActions } from '../../../actions/home';
import { notificationActions } from '../../../actions/notification';
import { getUserInformation } from '../../../graphql/queries';
import { WHITE, GREY600 } from '../../../theme/colors';
import { verySmallText } from '../../../theme/fonts';
import EyeSvg from '../../../assets/icons/eye-icon.svg';
import ClosedEyeSvg from '../../../assets/icons/eye-crossed-icon.svg';

const LoginView = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [navigatedFromWelcomeScreen, setNavigatedFromWelcomeScreen] =
    useState(false);

  const dispatch = useDispatch();
  const { isLoadingModels, isLoadingApexAccount, isLoadingApexAccountDetail } =
    useSelector((state) => state.portfolio);
  const isFocused = useIsFocused();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setNavigatedFromWelcomeScreen(route.params?.from === 'welcome');
  }, [route]);

  // when login screen loses focus, reset the 'from' route param
  useFocusEffect(
    useCallback(() => {
      return () => {
        navigation.setParams({ from: '' });
      };
    }, []),
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(userActions.clearUserData());
      dispatch(portfolioActions.clearPortfolioData());
      dispatch(homeActions.clearHomeData());
    } else {
      setPassword('');
      setEmail('');
    }
    return () => {
      setPassword('');
      setEmail('');
    };
  }, [isFocused]);

  const loading = useMemo(() => {
    if (
      isLoading ||
      isLoadingModels ||
      isLoadingApexAccount ||
      isLoadingApexAccountDetail
    ) {
      return true;
    }
    return false;
  }, [
    isLoading,
    isLoadingModels,
    isLoadingApexAccount,
    isLoadingApexAccountDetail,
  ]);

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      dispatch(userActions.clearUserData());
      dispatch(portfolioActions.clearPortfolioData());
      dispatch(homeActions.clearHomeData());
      setIsLoading(true);
      const res = await Auth.signIn({
        username: email,
        password: password,
      });
      const currentSession = await Auth.currentSession();
      const jwt = currentSession.getAccessToken().getJwtToken();
      dispatch(
        userActions.setLoggedUser({
          ...res,
          jwt,
        }),
      );
      const { data } = await API.graphql(
        graphqlOperation(getUserInformation, {
          id: res.username,
        }),
      );
      dispatch(
        userActions.setUserInfo({
          jwt,
          ...data.getUserInformation,
          email,
          userId: res.username,
        }),
      );

      if (
        data.getUserInformation.appStatus?.parent &&
        data.getUserInformation.appStatus?.sub
      ) {
        navigation.navigate(data.getUserInformation.appStatus.parent, {
          screen: data.getUserInformation.appStatus.sub,
        });
      } else {
        navigation.navigate('Home');
      }

      // OneSignal.addSubscriptionObserver((response) => {
      //   dispatch(
      //     notificationActions.setNotificationInfoRequest({
      //       token: `Bearer ${jwt}`,
      //       data: {
      //         subscriptionID: response.to.userId,
      //         pushToken: response.to.pushToken,
      //         // isSubscribed: response.to.isSubscribed,
      //         deviceType: Platform.OS,
      //         deviceMeta: 'iOS 11',
      //         userIP: '66.154.104.114',
      //         location: '107 SE Washington St, Ste 256',
      //       },
      //     }),
      //   );
      // });

      BackgroundTimer.stopBackgroundTimer();
    } catch (err) {
      console.log(err);
      if (err.message === 'User is disabled.') {
        setErrorMessage(err.message);
        return;
      }
      setErrorMessage('The email and password don’t match.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderListItem = () => (
    <>
      {errorMessage ? (
        <ErrorText
          error={errorMessage}
          errorContainer={styles.errorContainer}
        />
      ) : (
        <Title label="Welcome back." style={styles.title} />
      )}
      <TextInput
        label="Email"
        onChangeText={(text) => {
          setEmail(text);
          setErrorMessage(null);
        }}
        text={email}
        containerStyle={styles.textInput}
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        onChangeText={(text) => {
          setPassword(text);
          setErrorMessage(null);
        }}
        text={password}
        containerStyle={styles.textInput}
        secureTextEntry={secureTextEntry}
        icon={secureTextEntry ? <ClosedEyeSvg /> : <EyeSvg />}
        onPress={() => setSecureTextEntry(!secureTextEntry)}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPass}>Forgot password?</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppLayout
        renderListItem={renderListItem}
        from="login"
        backVisible={navigatedFromWelcomeScreen}>
        <Bottom
          label="Log in"
          onPress={handleLogin}
          isLoading={loading}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAwayStyle}
        />
      </AppLayout>
      <Overlay isLoading={loading} />
    </SafeAreaView>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  errorContainer: {
    marginTop: 0,
  },
  title: {
    marginBottom: 14,
  },
  textInput: {
    marginTop: 37,
  },
  forgotPass: {
    ...verySmallText,
    color: GREY600,
    marginTop: 15,
  },
  buttonWithKeyboardAwayStyle: {
    position: 'relative',
  },
});
