import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Header from '../../../components/common/Header';
import Description from '../../../components/common/Description';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import { WHITE400, GREY500, BLUE100 } from '../../../theme/colors';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const StopContribution = ({ route, navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    navigation.navigate('EditContributionReview', { from: 'stop' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.containerStyle}
      />
      <AppContainer>
        <Title label="Are you sure you want to stop your monthly contributions?" />
        <Description description="Your portfolio will still be invested and we'll continue to optimize your portfolio for $1/mo. However, maintaining consistent contributions will increase your chances of meeting your investment goals." />
        <Bottom label="Yes, continue" onPress={handleNextPage}>
          <Button
            label="Nevermind"
            onPress={goBack}
            style={styles.button}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default StopContribution;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  containerStyle: {
    paddingTop: 10,
  },
  button: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
});
