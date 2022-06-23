import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../../components/common/Button';
import Bottom from '../../../components/common/Bottom';
import ImageLayout from '../../../components/common/ImageLayout';
import { WHITE, GREY400, BLUE100, BLACK200 } from '../../../theme/colors';
import { mediumText } from '../../../theme/fonts';
import OnboardingOneSvg from '../../../assets/icons/welcome/Onboarding-1-icon.svg';
import OnboardingTwoSvg from '../../../assets/icons/welcome/Onboarding-2-icon.svg';
import OnboardingThreeSvg from '../../../assets/icons/welcome/Onboarding-3-icon.svg';
import OnboardingFourSvg from '../../../assets/icons/welcome/Onboarding-4-icon.svg';
import AppLogoSvg from '../../../assets/icons/stackwell-logo.svg';

const WELCOMES = [
  {
    image: <OnboardingOneSvg />,
    title: 'Go beyond just banking.',
    description: 'Discover how investing is key to building wealth.',
  },
  {
    image: <OnboardingTwoSvg />,
    title: 'Investing can be automatic.',
    description: 'See how Stackwell’s portfolios simplify the process.',
  },
  {
    image: <OnboardingThreeSvg />,
    title: 'Start with as little as $10.',
    description:
      'Start your investing journey today and watch your wealth stack up over time.',
  },
  {
    image: <OnboardingFourSvg />,
    title: 'Trust the process.',
    description: 'A simpler way to start investing in yourself.',
  },
];

const NotificationView = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.setItem('firstLoadedStackWell', 'loaded');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AppLogoSvg width={100} height={20} />
        <Swiper
          showsButtons={false}
          loop={true}
          paginationStyle={styles.paginationStyle}
          activeDotColor={BLUE100}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.dotStyle}
          dotColor={GREY400}>
          {WELCOMES.map((item, index) => (
            <View style={styles.item} key={`welcome_${index}`}>
              <ImageLayout
                icon={item.image}
                title={item.title}
                description={item.description}
                descriptionContainer={styles.descriptionContainer}
                style={styles.imageLayoutStyle}
              />
            </View>
          ))}
        </Swiper>
      </View>

      <Bottom
        label="Come stack with us"
        onPress={() => navigation.navigate('SignUp')}
        style={styles.bottomStyle}>
        <Button
          label="Log in"
          onPress={() =>
            navigation.navigate('Login', {
              screen: 'Login',
              params: { from: 'welcome' },
            })
          }
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
        />
      </Bottom>
    </SafeAreaView>
  );
};

export default NotificationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  loginButton: {
    backgroundColor: 'transparent',
    marginTop: 14,
  },
  loginButtonText: {
    ...mediumText,
    color: BLACK200,
    fontWeight: '600',
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4.5,
    marginLeft: 4.5,
  },
  paginationStyle: {
    bottom: 10,
  },
  descriptionContainer: {
    width: 280,
  },
  bottomStyle: {
    position: 'relative',
  },
  imageLayoutStyle: {
    paddingTop: 0,
  },
});
