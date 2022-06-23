import React, { useEffect, useMemo } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import AppContainer from '../../../components/common/AppContainer';
import Header from '../../../components/common/Header';
import Title from '../../../components/common/Title';
import { portfolioActions } from '../../../actions/portfolio';

import { BLACK100, WHITE400, GREY500, BLUE100 } from '../../../theme/colors';
import { extraLargeText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import Loading from '../../../components/common/Loading';

const PreviewLoading = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { apex, isLoading } = useSelector((state) => state.portfolio);

  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    const currentTime = moment();
    const createdAtTime = moment(user.createdAt);
    const checkTime = currentTime.diff(createdAtTime, 'hours', true);
    if (checkTime < 24 || apex?.accountStatus !== 'COMPLETE') {
      navigation.navigate('MonthlyContributionBlock');
    } else {
      dispatch(portfolioActions.getTransferRequest(token));
    }
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.header}
      />
      <AppContainer>
        <Title label="Monthly portfolio contribution" />
        {isLoading && <Loading backgroundColor="transparent" />}
      </AppContainer>
    </SafeAreaView>
  );
};

export default PreviewLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },

  header: {
    paddingTop: 10,
  },
  headerLeft: {
    color: BLACK100,
    ...extraLargeText,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
});
