import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native';
import { Auth } from 'aws-amplify';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import AppContainer from '../../../components/common/AppContainer';
import StickyHeader from '../../../components/common/StickyHeader';
import Title from '../../../components/common/Title';
import Header from '../../../components/common/Header';
import Bottom from '../../../components/common/Bottom';
import TextInput from '../../../components/common/TextInput';
import Overlay from '../../../components/common/Overlay';
import { validatePassword } from '../../../utility';
import { normalText } from '../../../theme/fonts';
import { BLUE100, WHITE, BLACK100, WHITE200 } from '../../../theme/colors';
import CheckSvg from '../../../assets/icons/check-icon.svg';
import EyeSvg from '../../../assets/icons/eye-icon.svg';
import ClosedEyeSvg from '../../../assets/icons/eye-crossed-icon.svg';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';

const ChangePassword = ({ route, navigation }) => {
  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [checkedString, setCheckedString] = useState(false);
  const [checkedSpecial, setCheckedSpecial] = useState(false);
  const [checkedNumber, setCheckedNumber] = useState(false);
  const [checkedLength, setCheckedLength] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [newSecureTextEntry, setNewSecureTextEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const validation = validatePassword(newPass);
    setCheckedLength(false);
    setCheckedString(false);
    setCheckedNumber(false);
    setCheckedSpecial(false);
    if (validation.checkedLength) {
      setCheckedLength(true);
    }
    if (validation.checkedString) {
      setCheckedString(true);
    }
    if (validation.checkedSpecial) {
      setCheckedSpecial(true);
    }
    if (validation.checkedNumber) {
      setCheckedNumber(true);
    }
  }, [newPass]);

  const handleOnChange = (text) => {
    setNewPass(text);
    setErrorMessage(null);
  };

  const handleNextPage = async () => {
    if (checkedString && checkedLength && checkedSpecial && checkedNumber) {
      try {
        setIsLoading(true);
        const currentUser = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(currentUser, password, newPass);
        navigation.navigate('ResetSuccess');
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
      return;
    }
    setErrorMessage('Please use the password rules below.');
  };
  const goBack = () => {
    navigation.goBack();
  };
  const renderItem = (text, validation) => {
    return (
      <View style={styles.renderItem}>
        {validation ? (
          <CheckSvg width={16} height={16} />
        ) : (
          <Text style={styles.icon}>•</Text>
        )}
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <>
        <Header
          leftIcon={<ArrowBackSvg />}
          onPressLeft={goBack}
          containerStyle={styles.containerStyle}
        />
        <Title label="Change password" style={styles.title} />
      </>
    );
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        onPressLeft={goBack}
        leftIcon={<ArrowBackSvg />}
        centerIcon={
          <Text style={styles.stickyHeaderText}>Change password</Text>
        }
      />
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.content}>
        <TextInput
          label="Current password"
          placeholder=""
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage(null);
          }}
          text={password}
          containerStyle={styles.textInput}
          secureTextEntry={secureTextEntry}
          icon={secureTextEntry ? <ClosedEyeSvg /> : <EyeSvg />}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        />
        <TextInput
          label="New password"
          placeholder=""
          onChangeText={handleOnChange}
          text={newPass}
          containerStyle={styles.textInput}
          secureTextEntry={newSecureTextEntry}
          icon={newSecureTextEntry ? <ClosedEyeSvg /> : <EyeSvg />}
          onPress={() => setNewSecureTextEntry(!newSecureTextEntry)}
          onSubmitEditing={handleNextPage}
          error={errorMessage}
        />
        <View style={styles.info}>
          {renderItem('8-16 characters', checkedLength)}
          {renderItem('Upper and lower case', checkedString)}
          {renderItem('Numbers', checkedNumber)}
          {renderItem('Special characters (ex: @#$)', checkedSpecial)}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <AppContainer style={styles.appContainer}>
        <FlatList
          data={['']}
          renderItem={renderContent}
          keyExtractor={(item, index) => index}
          onScroll={(e) => setPosition(e.nativeEvent.contentOffset.y)}
          nestedScrollEnabled
          ListHeaderComponent={renderHeader}
          style={styles.flatList}
          keyboardShouldPersistTaps="handled"
        />
        <Bottom
          label="Save"
          onPress={handleNextPage}
          isLoading={isLoading}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAwayStyle}
          isDisabled={!password || !newPass}
        />
      </AppContainer>
      <Overlay isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  textInput: {
    marginTop: 51,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
  info: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 3,
    borderRadius: 10,
    backgroundColor: BLUE100,
    marginTop: 13,
  },
  renderItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  text: {
    ...normalText,
    color: 'rgba(255, 255, 255, 0.94)',
    marginLeft: 9,
  },
  icon: {
    ...normalText,
    color: 'rgba(255, 255, 255, 0.94)',
  },
  buttonWithKeyboardAway: {
    position: 'relative',
    ...ifIphoneX(
      {},
      {
        borderTopColor: WHITE200,
        borderTopWidth: 1,
      },
    ),
  },
  content: {
    paddingHorizontal: 30,
  },
  flatList: {
    flex: 1,
    marginBottom: 10,
  },
  title: {
    paddingLeft: 30,
  },
  containerStyle: {
    paddingTop: 10,
  },
  stickyHeaderText: {
    ...normalText,
    color: BLACK100,
  },
  appContainer: {
    paddingHorizontal: 0,
  },
});
