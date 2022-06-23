import React, { useMemo } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';

import AppContainer from '../../../../components/common/AppContainer';
import Title from '../../../../components/common/Title';
import Header from '../../../../components/common/Header';
import PortfolioComponent from '../../../../components/home/Portfolio';

import {
  WHITE,
  WHITE400,
  GREEN800,
  GREY700,
  BLACK200,
} from '../../../../theme/colors';
import { smallText } from '../../../../theme/fonts';
import ArrowBackSvg from '../../../../assets/icons/arrow-back-icon.svg';
import DocumentSvg from '../../../../assets/icons/document-icon.svg';

const DocumentStatement = ({ route, navigation }) => {
  const { documents } = useSelector((state) => state.user);

  const selectedStatements = useMemo(() => {
    const data = documents
      .filter((v) => v.documentCategory === route?.params?.documentCategory)
      .map((v) => {
        return {
          ...v,
          label1: moment(v.documentDate).format('MMM, YYYY'),
          onPress: () => handleViewDoc(v),
        };
      });
    return data || [];
  }, [documents, route]);

  const handleViewDoc = (doc) => {
    navigation.navigate('Document', {
      documentId: doc.documentId,
      documentDate: moment(doc.documentDate).format('MMM, YYYY'),
    });
  };

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
        <Title label={route?.params?.label} />
        {selectedStatements.length > 0 ? (
          <View style={styles.activityFlatList}>
            <FlatList
              data={selectedStatements}
              renderItem={({ item, index }) => (
                <PortfolioComponent
                  item={item}
                  isLastItem={index === selectedStatements.length - 1}
                />
              )}
              keyExtractor={(item, index) => `documents${index}`}
              scrollEnabled={false}
            />
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateIconContainer}>
              <DocumentSvg />
            </View>
            <Text style={styles.emptyStateText}>No documents to display</Text>
          </View>
        )}
      </AppContainer>
    </SafeAreaView>
  );
};

export default DocumentStatement;

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
  emptyStateContainer: {
    alignItems: 'center',
    marginTop: hp('27%'),
  },
  emptyStateIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: GREY700,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyStateText: {
    width: 130,
    color: BLACK200,
    ...smallText,
    textAlign: 'center',
  },
});
