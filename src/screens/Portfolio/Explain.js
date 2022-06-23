import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import AppContainer from '../../components/common/AppContainer';
import Bottom from '../../components/common/Bottom';
import Button from '../../components/common/Button';
import ImageLayout from '../../components/common/ImageLayout';
import { WHITE, GREY500, BLUE100 } from '../../theme/colors';
import PortfolioSvg from '../../assets/icons/portfolio-icon.svg';
import { statusActions } from '../../actions/status';

const ExplainView = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleNextPage = () => {
    dispatch(
      statusActions.setAppCurrentStatus({
        parent: 'Portfolio',
        sub: 'InvestGoals',
      }),
    );
    navigation.navigate('InvestGoals');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<PortfolioSvg />}
          title="Portfolio setup"
          description="To recommend the right investment portfolio for you, we need to ask a few more questions."
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom label="OK, got it" onPress={handleNextPage}>
          <Button
            label="Back"
            onPress={goBack}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default ExplainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  descriptionContainer: {
    maxWidth: 330,
  },
});
