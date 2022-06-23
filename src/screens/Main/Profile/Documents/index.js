import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import AppContainer from '../../../../components/common/AppContainer';
import Title from '../../../../components/common/Title';
import Header from '../../../../components/common/Header';
import Loading from '../../../../components/common/Loading';
import PortfolioComponent from '../../../../components/home/Portfolio';
import { userActions } from '../../../../actions/user';

import { WHITE, WHITE400, GREEN800 } from '../../../../theme/colors';
import ArrowBackSvg from '../../../../assets/icons/arrow-back-icon.svg';

const Documents = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      userActions.getAllDocumentsRequest({
        token: `Bearer ${user.jwt}`,
      }),
    );
  }, []);

  const DocumentsList = [
    {
      label1: 'Monthly statements',
      onPress: () =>
        navigation.navigate('DocumentStatement', {
          documentCategory: 'STATEMENT',
          label: 'Monthly statements',
        }),
    },
    {
      label1: 'Trade confirmations',
      onPress: () =>
        navigation.navigate('DocumentStatement', {
          documentCategory: 'TRADE_CONFIRMATION',
          label: 'Trade confirmations',
        }),
    },
    {
      label1: 'Tax documents',
      onPress: () =>
        navigation.navigate('DocumentStatement', {
          documentCategory: 'TAX_FORM',
          label: 'Tax documents',
        }),
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.containerStyle}
      />
      <AppContainer>
        <Title label="Statements" />
        {DocumentsList.length > 0 && (
          <View style={styles.activityFlatList}>
            <FlatList
              data={DocumentsList}
              renderItem={({ item, index }) => (
                <PortfolioComponent
                  item={item}
                  isLastItem={index === DocumentsList.length - 1}
                />
              )}
              keyExtractor={(item, index) => `documents${index}`}
              scrollEnabled={false}
            />
          </View>
        )}
      </AppContainer>
      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

export default Documents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  activityFlatList: {
    width: '100%',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderColor: GREEN800,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 34,
  },
  containerStyle: {
    paddingTop: 10,
  },
});
