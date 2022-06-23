import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../../components/common/AppContainer';
import Title from '../../../../components/common/Title';
import Header from '../../../../components/common/Header';
import Description from '../../../../components/common/Description';
import Bottom from '../../../../components/common/Bottom';
import TextInput from '../../../../components/common/TextInput';
import { WHITE400 } from '../../../../theme/colors';
import { homeActions } from '../../../../actions/home';
import ArrowBackSvg from '../../../../assets/icons/arrow-back-icon.svg';

const OtherReason = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { accountCloseLoading } = useSelector((state) => state.home);

  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNext = () => {
    if (!reason) {
      return setErrorMessage('Please tell us why you’d like to close.');
    }
    const token = `Bearer ${user?.jwt}`;
    dispatch(
      homeActions.setCloseReasonRequest({
        reason,
        token,
      }),
    );
  };

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
        <Title label="Reason you’d like to close" />
        <Description
          description="Please let us know why you’d like to close your account and a support specialist will contact you to handle this further."
          style={styles.description}
        />
        <TextInput
          label="Reason"
          text={reason}
          onChangeText={(text) => {
            setReason(text);
            setErrorMessage(null);
          }}
          multiline={true}
          error={errorMessage}
        />
        <Bottom
          label="Have someone contact me"
          onPress={handleNext}
          isDisabled={!reason}
          isLoading={accountCloseLoading}
        />
      </AppContainer>
    </SafeAreaView>
  );
};

export default OtherReason;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  description: {
    marginBottom: 36,
  },
  header: {
    paddingTop: 10,
  },
});
