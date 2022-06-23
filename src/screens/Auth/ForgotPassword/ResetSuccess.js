import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Bottom from '../../../components/common/Bottom';
import Description from '../../../components/common/Description';
import Header from '../../../components/common/Header';
import { WHITE } from '../../../theme/colors';

const ResetSuccess = ({ navigation }) => {
  const handleNextPage = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AppContainer>
        <Title label="Great, you’re good to go." />
        <Description description="Your password has been reset. Please go ahead and login to Stackwell." />
        <Bottom label="Log in" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default ResetSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  textInput: {
    marginTop: 51,
  },
});
