import React, { useMemo } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import Pdf from 'react-native-pdf';

import Header from '../../components/common/Header';
import { WHITE } from '../../theme/colors';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';
import Loading from '../../components/common/Loading';

const AgreementDocuments = ({ navigation }) => {
  const { documents, doc } = useSelector((state) => state.portfolio);

  const pdf = useMemo(() => {
    if (doc === 'terms') {
      return documents.find((document) =>
        document.fileName.includes('Terms of Service'),
      );
    } else if (doc === 'privacy') {
      return documents.find((document) =>
        document.fileName.includes('Privacy Policy'),
      );
    } else if (doc === 'formCRS') {
      return documents.find((document) =>
        document.fileName.includes('Form CRS'),
      );
    } else if (doc === 'advisory') {
      return documents.find((document) =>
        document.fileName.includes('Investment Adviser Agreementv'),
      );
    } else {
      return documents.find((document) =>
        document.fileName.includes('ADV Part 2A'),
      );
    }
  }, [documents, doc]);

  const goBack = () => {
    navigation.goBack();
  };

  console.log(pdf?.fileName);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.containerStyle}
      />
      <Pdf
        source={{ uri: pdf?.url }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        renderActivityIndicator={() => <Loading />}
        style={styles.pdf}
      />
    </SafeAreaView>
  );
};

export default AgreementDocuments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  containerStyle: {
    paddingTop: 10,
  },
  pdf: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
