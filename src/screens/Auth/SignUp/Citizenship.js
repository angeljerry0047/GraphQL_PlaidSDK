import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import SelectInput from '../../../components/common/SelectInput';
import Header from '../../../components/common/Header';
import Description from '../../../components/common/Description';
import { WHITE } from '../../../theme/colors';
import { userActions } from '../../../actions/user';
import { statusActions } from '../../../actions/status';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const USER_TYPES = [
  {
    value: 1,
    label: 'Yes, I’m a U.S. citizen.',
  },
  {
    value: 0,
    label: 'I’m not a U.S. citizen.',
  },
];

const Citizenship = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSelectedItem = async (type) => {
    if (type === 1) {
      dispatch(
        statusActions.setAppCurrentStatus({
          parent: 'SignUp',
          sub: 'Step9',
        }),
      );
      return navigation.navigate('Step9');
    }
    navigation.navigate('Step10');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="Are you a U.S. citizen?" />
        <Description
          description="We’re legally required to ask this because Stackwell is only available to U.S. citizens."
          style={styles.description}
        />
        {USER_TYPES.map((user, index) => (
          <SelectInput
            key={`citizen_${index}`}
            item={user}
            handleSelectedItem={handleSelectedItem}
            containerStyle={styles.selectInput}
          />
        ))}
      </AppContainer>
    </SafeAreaView>
  );
};

export default Citizenship;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  selectInput: {
    marginTop: 25,
  },
  description: {
    marginBottom: 11,
  },
});
