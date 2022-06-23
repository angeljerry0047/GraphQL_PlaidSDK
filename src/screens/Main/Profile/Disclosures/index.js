import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AppContainer from '../../../../components/common/AppContainer';
import Title from '../../../../components/common/Title';
import Header from '../../../../components/common/Header';
import PortfolioComponent from '../../../../components/home/Portfolio';
import { WHITE, WHITE400, GREEN800 } from '../../../../theme/colors';
import ArrowBackSvg from '../../../../assets/icons/arrow-back-icon.svg';
import { portfolioActions } from '../../../../actions/portfolio';

const Disclosures = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const handleOpenDocument = (doc) => {
    dispatch(
      portfolioActions.getAgreementPolicyRequest({
        url: 'stackwell-documents',
        doc,
      }),
    );
  };

  const DisclosuresList = [
    {
      label1: 'Terms of Service',
      onPress: () => handleOpenDocument('terms'),
    },
    {
      label1: 'Advisory Agreement',
      onPress: () => handleOpenDocument('advisory'),
    },
    {
      label1: 'Privacy Policy',
      onPress: () => handleOpenDocument('privacy'),
    },
    {
      label1: 'Form CRS',
      onPress: () => handleOpenDocument('formCRS'),
    },
    {
      label1: 'ADV Part 2A',
      onPress: () => handleOpenDocument('ADVPart2A'),
    },
    {
      label1: 'Apex Customer Account Agreement and Advisor Authorization',
      onPress: () => handleOpenDocument('agreement'),
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
        <Title label="Legal documents" />
        <View style={styles.activityFlatList}>
          <FlatList
            data={DisclosuresList}
            renderItem={({ item, index }) => (
              <PortfolioComponent
                item={item}
                isLastItem={index === DisclosuresList.length - 1}
              />
            )}
            keyExtractor={(item, index) => `Disclosures${index}`}
            scrollEnabled={false}
          />
        </View>
      </AppContainer>
    </SafeAreaView>
  );
};

export default Disclosures;

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
