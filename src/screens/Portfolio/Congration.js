import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import MakeItRain from 'react-native-make-it-rain';
import { useDispatch } from 'react-redux';

import AppContainer from '../../components/common/AppContainer';
import Bottom from '../../components/common/Bottom';
import ImageLayout from '../../components/common/ImageLayout';
import { WHITE } from '../../theme/colors';
import CongurationSvg from '../../assets/icons/conguration.svg';
import { statusActions } from '../../actions/status';

const CongrationView = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleNextPage = () => {
    dispatch(
      statusActions.setAppCurrentStatus({
        parent: 'Portfolio',
        sub: 'Historical',
      }),
    );
    navigation.navigate('Historical');
  };

  return (
    <SafeAreaView style={styles.container}>
      <MakeItRain
        numItems={80}
        itemColors={['#00FCDC', '#4FCBC2', '#3A506B']}
      />
      <AppContainer>
        <ImageLayout
          icon={<CongurationSvg />}
          title="Congrats, you’re on the path to wealth creation."
          description="Now let’s check out your projected returns."
        />
        <Bottom label="Continue" onPress={handleNextPage} />
      </AppContainer>
    </SafeAreaView>
  );
};

export default CongrationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
