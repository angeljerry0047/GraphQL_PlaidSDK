import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Pdf from 'react-native-pdf';

import Header from '../../../../components/common/Header';
import Title from '../../../../components/common/Title';
import Loading from '../../../../components/common/Loading';
import { userActions } from '../../../../actions/user';
import { WHITE, GREEN800 } from '../../../../theme/colors';
import ArrowBackSvg from '../../../../assets/icons/arrow-back-icon.svg';

const Document = ({ route, navigation }) => {
  const { isLoading, user, document } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!route?.params?.documentId) {
      return;
    }
    dispatch(
      userActions.getDocumentStatementRequest({
        documentId: route.params.documentId,
        token: `Bearer ${user.jwt}`,
      }),
    );
  }, [route]);

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
      <Title label={route.params?.documentDate} textStyle={styles.text} />
      {isLoading && <Loading />}
      {document?.url && (
        <Pdf
          source={{ uri: document.url }}
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
          style={styles.pdf}
        />
      )}
    </SafeAreaView>
  );
};

export default Document;

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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderTopColor: GREEN800,
    borderTopWidth: 1,
    backgroundColor: WHITE,
  },
  text: {
    paddingLeft: 30,
    marginBottom: 36,
  },
});
