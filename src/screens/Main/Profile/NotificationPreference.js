import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Switch, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Header from '../../../components/common/Header';
import Description from '../../../components/common/Description';
import {
  WHITE,
  BLACK300,
  GREEN800,
  GREEN1000,
  GREY100,
} from '../../../theme/colors';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const NotificationPreference = ({ navigation }) => {
  const [enabled, setEnabled] = useState(true);
  const dispatch = useDispatch();

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
        <Title label="Notification preferences" />
        <Description
          description="Choose to receive notifications about important account activity and documents."
          textStyle={styles.description}
        />
        <View style={styles.notication}>
          <Text>Receive push notifications</Text>
          <Switch
            value={enabled}
            onValueChange={() => setEnabled(!enabled)}
            trackColor={{ false: GREY100, true: GREEN1000 }}
          />
        </View>
      </AppContainer>
    </SafeAreaView>
  );
};

export default NotificationPreference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    paddingTop: 10,
  },
  description: {
    color: BLACK300,
  },
  notication: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: GREEN800,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 20,
    paddingVertical: 25,
    marginTop: 36,
  },
});
