import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import ImageLayout from '../../../components/common/ImageLayout';
import { WHITE, GREY500, BLUE100 } from '../../../theme/colors';
import PortfolioSvg from '../../../assets/icons/portfolio-icon.svg';

const MonthlyContributionEmpty = ({ navigation }) => {
  const handleNextPage = () => {
    navigation.navigate('EditMonthlyContribution', { type: 'new' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<PortfolioSvg />}
          title="Set a monthly contribution."
          description="Your portfolio value will grow significantly more over time with monthly contributions. "
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom label="Continue" onPress={handleNextPage}>
          <Button
            label="Back"
            onPress={() => navigation.pop(2)}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default MonthlyContributionEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  descriptionContainer: {
    maxWidth: 330,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
});
