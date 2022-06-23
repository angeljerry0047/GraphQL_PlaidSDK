import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import TextInput from '../../../components/common/TextInput';
import Header from '../../../components/common/Header';
import Description from '../../../components/common/Description';
import StickyHeader from '../../../components/common/StickyHeader';
import Bottom from '../../../components/common/Bottom';
import Contact from '../../../components/home/Contact';
import InfoPanel from '../../../components/profile/InfoPanel';

import {
  WHITE,
  WHITE200,
  WHITE400,
  BLACK100,
  BLACK300,
  GREEN800,
  BLUE100,
} from '../../../theme/colors';
import { mediumText, normalText } from '../../../theme/fonts';
import { userActions } from '../../../actions/user';
import { validationName } from '../../../utility';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import InfoSvg from '../../../assets/icons/info-icon.svg';
import ErrorText from '../../../components/common/ErrorText';

const TrustedContact = ({ route, navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [trustedEmail, setTrustedEmail] = useState('');
  const [trustedPhone, setTrustedPhone] = useState('');
  const [trustedAddress, setTrustedAddress] = useState('');
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(0);
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState(false);
  const [mail, setMail] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const { isLoading: portLoading, apex } = useSelector(
    (state) => state.portfolio,
  );

  useEffect(() => {
    const trustedInfo = apex?.owner?.trustContact;
    if (trustedInfo) {
      setFirstName(trustedInfo.givenName);
      setLastName(trustedInfo.familyName);
      setTrustedEmail(trustedInfo.emailAddress);
      setTrustedPhone(trustedInfo.phoneNumber?.phoneNumber);
      setTrustedAddress(trustedInfo.mailingAddress);
      if (trustedInfo.emailAddress) {
        setEmail(true);
      }
      if (trustedInfo.phoneNumber?.phoneNumber) {
        setPhone(true);
      }
      if (trustedInfo.mailingAddress?.city) {
        setMail(true);
      }
    }
  }, [apex]);

  const contactList = useMemo(
    () => [
      {
        label1: 'Contact by phone',
        label2: trustedPhone,
        value: 'phone',
        isEnabled: phone && !!trustedPhone,
      },
      {
        label1: 'Contact by email',
        label2: trustedEmail,
        value: 'email',
        isEnabled: email && !!trustedEmail,
      },
      {
        label1: 'Contact by regular mail',
        label2: trustedAddress ? JSON.stringify(trustedAddress) : null,
        value: 'mail',
        isEnabled: mail && !!trustedAddress?.city,
      },
    ],
    [trustedPhone, trustedEmail, trustedAddress, phone, email, mail],
  );

  const handleChangeSwitch = (val, type) => {
    if (type === 'phone') {
      setPhone(val);
      val &&
        navigation.navigate('TrustedMobileNum', {
          onSelect: (text) => setTrustedPhone(text),
          phone: trustedPhone,
        });
    } else if (type === 'email') {
      setEmail(val);
      val &&
        navigation.navigate('TrustedEmail', {
          onSelect: (text) => setTrustedEmail(text),
          email: trustedEmail,
        });
    } else {
      setMail(val);
      val &&
        navigation.navigate('TrustedAddress', {
          onSelect: (text) => {
            setTrustedAddress(text);
          },
        });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    setError(null);
    if (!firstName && !firstName.trim() && !validationName(firstName)) {
      setError('Please enter your legal first name.');
      return;
    }
    if (!lastName && !lastName.trim() && !validationName(lastName)) {
      setError('Please enter your legal last name.');
      return;
    }
    const data = {
      givenName: firstName,
      familyName: lastName,
      contactForm: {},
    };
    if (email) {
      data.contactForm.emailAddress = trustedEmail;
    }
    if (phone) {
      data.contactForm.phoneNumber = {
        phoneNumber: trustedPhone,
        phoneNumberType: 'HOME',
      };
    }
    if (mail) {
      data.contactForm.mailingAddress = trustedAddress;
    }
    const token = `Bearer ${user?.jwt}`;
    dispatch(userActions.addTrustContractRequest({ data, token }));
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        rightIcon={<InfoSvg />}
        onPressRight={() => setInfoModalVisible(true)}
        centerIcon={
          <Text style={styles.fixedHeaderCenter}>Trusted contact</Text>
        }
      />
    );
  };

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        rightIcon={<InfoSvg />}
        onPressRight={() => setInfoModalVisible(true)}
        containerStyle={styles.header}
      />
    );
  };

  const renderItem = () => {
    return (
      <AppContainer flatList>
        <Title label="Trusted contact" />
        <Description
          description="A person who can act in your best interest if something unexpected
          happens in your life."
          textStyle={styles.description}
        />
        {!!error && <ErrorText error={error} />}
        <TextInput
          label="First name"
          placeholder=""
          onChangeText={(val) => {
            setFirstName(val);
            setError(null);
            dispatch(
              userActions.setUserInfo({
                trustedFirstName: val,
              }),
            );
          }}
          text={firstName}
          containerStyle={styles.textInput}
          autoFocus={true}
          autoCapitalize={'words'}
        />
        <TextInput
          label="Last name"
          placeholder=""
          onChangeText={(val) => {
            setLastName(val);
            setError(null);
            dispatch(
              userActions.setUserInfo({
                trustedLastName: val,
              }),
            );
          }}
          text={lastName}
          containerStyle={styles.textInput}
          autoCapitalize={'words'}
        />
        <View style={styles.activityFlatList}>
          <FlatList
            data={contactList}
            renderItem={({ item }) => (
              <Contact item={item} handleChangeSwitch={handleChangeSwitch} />
            )}
            keyExtractor={(item) => item.value}
            scrollEnabled={false}
            ListHeaderComponent={
              <Text style={styles.contactHeader}>
                If necessary, how should we contact this person?
              </Text>
            }
          />
        </View>
      </AppContainer>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <FlatList
          data={['']}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          onScroll={(e) => setPosition(e.nativeEvent.contentOffset.y)}
          ListHeaderComponent={renderHeader}
          nestedScrollEnabled
          style={styles.flatList}
        />
        {!!firstName && !!lastName && (
          <Bottom
            label="Save"
            onPress={handleNextPage}
            isLoading={isLoading || portLoading}
            isDisabled={!email && !phone && !mail}
            buttonWithKeyboardAwayStyle={styles.bottom}
          />
        )}
      </KeyboardAvoidingView>

      <Modal
        isVisible={isInfoModalVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setInfoModalVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel
          handleDismiss={() => setInfoModalVisible(false)}
          description="Thanks for providing this information. We'll keep it on file in case we ever need it."
        />
      </Modal>
    </SafeAreaView>
  );
};

export default TrustedContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  fixedHeaderCenter: {
    color: BLACK100,
    ...normalText,
    textTransform: 'capitalize',
  },
  description: {
    ...mediumText,
    color: BLACK300,
  },
  textInput: {
    marginTop: 36,
  },
  activityFlatList: {
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderColor: GREEN800,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 41,
  },
  contactHeader: {
    ...mediumText,
    color: BLACK100,
    paddingVertical: 25,
  },
  header: {
    paddingTop: 10,
  },
  bottom: {
    backgroundColor: WHITE,
    paddingTop: 20,
    borderTopColor: WHITE200,
    borderTopWidth: 1,
  },
  keyboardAvoidStyle: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    marginBottom: 20,
  },
  buttonWithKeyboardAway: {
    position: 'relative',
    paddingHorizontal: 30,
  },
});
