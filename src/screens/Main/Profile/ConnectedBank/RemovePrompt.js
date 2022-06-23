import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import AppContainer from '../../../../components/common/AppContainer';
import Title from '../../../../components/common/Title';
import Header from '../../../../components/common/Header';
import Loading from '../../../../components/common/Loading';
import Description from '../../../../components/common/Description';
import Bottom from '../../../../components/common/Bottom';
import Button from '../../../../components/common/Button';

import { portfolioActions } from '../../../../actions/portfolio';

import { WHITE400, GREY500, BLUE100 } from '../../../../theme/colors';
import ArrowBackSvg from '../../../../assets/icons/arrow-back-icon.svg';

const RemovePrompt = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const { accounts, apexBalance, isLoadingCancelAchRelationship } = useSelector(
    (state) => state.portfolio,
  );

  useEffect(() => {}, []);

  const goBack = () => {
    navigation.goBack();
  };
  const removeBank = () => {
    const token = `Bearer ${user?.jwt}`;
    dispatch(
      portfolioActions.cancelAchRelationshipRequest({
        token,
        router: 'RemoveBankConfirm',
        accounts,
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.containerStyle}
      />
      <AppContainer>
        <Title label="Are you sure you want to remove your bank account?" />
        <Description description="Monthly contributions will no longer be made to your portfolio once your bank account is removed. Your portfolio value will still grow over time without monthly contributions but the return will be significantly less. " />
        <Bottom
          label="Yes, remove my bank account"
          onPress={removeBank}
          isLoading={isLoadingCancelAchRelationship}>
          <Button
            label="Nevermind"
            onPress={goBack}
            style={styles.button}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

export default RemovePrompt;

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
