import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Button from '../../../components/common/Button';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import Label from '../../../components/common/Label';
import { portfolioActions } from '../../../actions/portfolio';
import { modelsSelector } from '../../../selectors/portfolio';
import { WHITE400, BLACK200, GREY500, BLUE100 } from '../../../theme/colors';
import { verySmallText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const PortfolioReview = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.portfolio);
  const models = useSelector(modelsSelector);

  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  };

  const goCancel = () => {
    navigation.navigate('TransferHome');
  };

  const handleSelectPortfolio = () => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    dispatch(
      portfolioActions.setPortfolioInfo({
        oldType: route.params?.currentPortfolio,
        newType: route.params?.newPortfolio,
      }),
    );
    dispatch(
      portfolioActions.updatePortfolioRequest({
        modelId: models[route.params?.newPortfolio].id,
        token,
        type: route.params?.newPortfolio,
        router: 'ChangeConfirm',
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.headerContainer}
      />
      <AppContainer>
        <Title label="Review portfolio change" style={styles.title} />
        <TextInput
          label="Current portfolio"
          text={route.params?.currentPortfolio}
          containerStyle={styles.textInput}
          editable={false}
        />
        <TextInput
          label="New portfolio"
          text={route.params?.newPortfolio}
          containerStyle={styles.textInput}
          editable={false}
        />
        <Label
          label="Changing your portfolio may result in the purchase or sale of some securities. This may have tax consequences that you should discuss with your tax advisor before making the change."
          style={styles.labelContainer}
          textStyle={styles.label}
        />
        <Bottom
          label="Make change"
          onPress={handleSelectPortfolio}
          isLoading={isLoading}>
          <Button
            label="Cancel"
            onPress={goCancel}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default PortfolioReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  headerContainer: {
    paddingTop: 10,
  },
  title: {
    marginBottom: 14,
  },
  textInput: {
    marginTop: 37,
  },
  address: {
    ...verySmallText,
    color: BLACK200,
    marginTop: 10,
    marginBottom: 37,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  labelContainer: {
    marginTop: 36,
  },
  label: {
    fontWeight: '500',
    letterSpacing: 0,
    fontSize: 14,
  },
});
