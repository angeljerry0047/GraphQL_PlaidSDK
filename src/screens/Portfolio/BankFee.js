import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../components/common/AppContainer';
import Bottom from '../../components/common/Bottom';
import ImageLayout from '../../components/common/ImageLayout';
import Button from '../../components/common/Button';
import { portfolioActions } from '../../actions/portfolio';
import { statusActions } from '../../actions/status';
import { largeBoldText } from '../../theme/fonts';
import { WHITE, GREY500, BLUE100 } from '../../theme/colors';
import OnboardingSvg from '../../assets/icons/onboarding-1-icon.svg';

const BankFee = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.portfolio);

  useEffect(() => {}, []);

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    dispatch(
      statusActions.setAppCurrentStatus({
        parent: 'Portfolio',
        sub: 'ConnectBank',
      }),
    );
    navigation.navigate('ConnectBank');
  };

  const description = () => {
    return (
      <Text>
        For <Text style={styles.bold}>$1/month</Text>, we'll review and update
        your portfolio regularly to ensure it has the optimum mix of investments
        for your situation.
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppContainer>
        <ImageLayout
          icon={<OnboardingSvg />}
          title="We’ll optimize your portfolio."
          description={description()}
          descriptionContainer={styles.descriptionContainer}
        />
        <Bottom
          label="Accept $1/month charge "
          onPress={handleNextPage}
          isLoading={isLoading}>
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

export default BankFee;

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
  plaidButton: {
    marginBottom: 16,
    height: 50,
    backgroundColor: BLUE100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plaidButtonText: {
    color: WHITE,
    ...largeBoldText,
  },
  backButtonStyle: {
    backgroundColor: GREY500,
  },
  descriptionContainer: {
    maxWidth: 330,
  },
  bold: { fontWeight: '700' },
});
