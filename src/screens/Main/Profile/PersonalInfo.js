import React, { useState, useMemo } from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import moment from 'moment';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import { WHITE400, BLACK200, BLUE100 } from '../../../theme/colors';
import { verySmallText, normalText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import EditSvg from '../../../assets/icons/edit-icon.svg';
import InfoSvg from '../../../assets/icons/large-Info-icon.svg';
import StickyHeader from '../../../components/common/StickyHeader';
import InfoPanel from '../../../components/profile/InfoPanel';
import ClickableEmailAddress from '../../../components/common/ClickableEmailAddress';
import ClickablePhoneNumber from '../../../components/common/ClickablePhoneNumber';

const PersonalInfo = ({ navigation }) => {
  const [position, setPosition] = useState(0);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { apex } = useSelector((state) => state.portfolio);

  const goBack = () => {
    navigation.goBack();
  };

  const checkTime = useMemo(() => {
    const currentTime = moment();
    const createdAtTime = moment(user.createdAt);
    return currentTime.diff(createdAtTime, 'hours', true);
  }, [user]);

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <>
        <Header
          leftIcon={<ArrowBackSvg />}
          onPressLeft={goBack}
          containerStyle={styles.header}
        />
        <Title label="Personal info" style={styles.title} />
      </>
    );
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        centerIcon={
          <Title label="Personal info" textStyle={styles.stickyTitle} />
        }
      />
    );
  };

  const renderItem = () => {
    return (
      <AppContainer flatList>
        <TextInput
          label="Mobile number"
          text={user.mobileNumber}
          containerStyle={styles.textInput}
          icon={<EditSvg />}
          editable={false}
          onPress={() => {
            if (checkTime < 24 || apex?.accountStatus !== 'COMPLETE') {
              navigation.push('WaitingPersonalInfo');
            } else {
              navigation.push('MobileNum');
            }
          }}
        />
        <TextInput
          label="U.S. address"
          text={user.address?.streetAddress}
          containerStyle={styles.textInput}
          numberOfLine={2}
          icon={<EditSvg />}
          editable={false}
          onPress={() => {
            if (checkTime < 24 || apex?.accountStatus !== 'COMPLETE') {
              navigation.push('WaitingPersonalInfo');
            } else {
              navigation.push('Address');
            }
          }}
        />
        <Text style={styles.address}>{`${
          user.address?.city ? `${user.address?.city},` : ''
        } ${user.address?.state} ${user.address?.postalCode}`}</Text>
        <TextInput
          label="Email address"
          text={user.email}
          containerStyle={styles.textInput}
          icon={<InfoSvg />}
          onPress={() => setInfoModalVisible(true)}
          editable={false}
        />
        <TextInput
          label="Legal first name"
          text={user.firstName}
          containerStyle={styles.textInput}
          icon={<InfoSvg />}
          onPress={() => setInfoModalVisible(true)}
          editable={false}
        />
        <TextInput
          label="Legal last name"
          text={user.lastName}
          containerStyle={styles.textInput}
          icon={<InfoSvg />}
          onPress={() => setInfoModalVisible(true)}
          editable={false}
        />
        <TextInput
          label="Date of birth"
          text={user.dateOfBirth}
          containerStyle={styles.textInput}
          icon={<InfoSvg />}
          onPress={() => setInfoModalVisible(true)}
          editable={false}
        />
        <TextInput
          label="Social security number"
          text={`****-**-${user.lastFourSSN}`}
          containerStyle={styles.textInput}
          icon={<InfoSvg />}
          onPress={() => setInfoModalVisible(true)}
          editable={false}
        />
      </AppContainer>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <FlatList
        data={['']}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        onScroll={(e) => setPosition(e.nativeEvent.contentOffset.y)}
        nestedScrollEnabled
        ListHeaderComponent={renderHeader}
      />
      <Modal
        isVisible={isInfoModalVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setInfoModalVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel handleDismiss={() => setInfoModalVisible(false)}>
          Thanks for providing this information. For your security, you are
          unable to update this information directly in the app. Please contact
          Stackwell's customer support team via email at{' '}
          <ClickableEmailAddress emailAddress="support@stackwellcapital.com" />{' '}
          or via telephone at{' '}
          <ClickablePhoneNumber phoneNumber="(888) 499-2448" /> to make any
          necessary changes.
        </InfoPanel>
      </Modal>
    </SafeAreaView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  title: {
    marginBottom: 14,
    paddingLeft: 30,
  },
  stickyTitle: {
    ...normalText,
  },
  textInput: {
    marginTop: 37,
  },
  address: {
    ...verySmallText,
    color: BLACK200,
    marginTop: 10,
  },
  header: {
    paddingTop: 10,
  },
});
