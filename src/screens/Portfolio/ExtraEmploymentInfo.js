import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { API, graphqlOperation } from 'aws-amplify';

import AppContainer from '../../components/common/AppContainer';
import TextInput from '../../components/common/TextInput';
import Bottom from '../../components/common/Bottom';
import Title from '../../components/common/Title';
import Header from '../../components/common/Header';
import StickyHeader from '../../components/common/StickyHeader';

import ProgressBar from '../../components/profile/ProgressBar';
import InfoPanel from '../../components/profile/InfoPanel';
import { portfolioActions } from '../../actions/portfolio';
import { userActions } from '../../actions/user';
import { updateUserInformation } from '../../graphql/mutations';

import { WHITE, BLACK100, BLUE100 } from '../../theme/colors';
import { normalText } from '../../theme/fonts';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';
import InfoSvg from '../../assets/icons/large-Info-icon.svg';

const ExtraEmploymentInfo = ({ navigation }) => {
  const [employer, setEmployer] = useState('');
  const [position, setPosition] = useState('');
  const [errorEmployer, setErrorEmployer] = useState('');
  const [errorPosition, setErrorPosition] = useState('');
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!isKeyboardVisible) {
      setPosition(0);
    }
  }, [isKeyboardVisible]);

  const handleNextPage = async (answer) => {
    if (!employer) {
      setErrorEmployer('Please enter your employer.');
      return;
    }

    if (!position) {
      setErrorPosition('Please enter your position.');
      return;
    }

    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            employment: {
              ...user.employment,
              positionEmployed: position,
              employer,
            },
            appStatus: {
              parent: 'Portfolio',
              sub: 'ExtraEmploymentInfo',
            },
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          employment: {
            ...user.employment,
            positionEmployed: position,
            employer,
          },
          appStatus: {
            parent: 'Portfolio',
            sub: 'ExtraEmploymentInfo',
          },
        }),
      );

      dispatch(
        portfolioActions.setOriginalPortfolioAnswers({
          positionEmployed: position,
          employer,
        }),
      );
      navigation.navigate('AnnualIncome');
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderStickyHeader = () => {
    if (scrollPosition < 60) {
      return null;
    }
    return (
      <StickyHeader
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        centerIcon={
          <Text numberOfLines={1} style={styles.stickyTitle}>
            Please tell us more about your employment.
          </Text>
        }
        onPressRight={() => setInfoModalVisible(true)}
        rightIcon={<InfoSvg />}
      />
    );
  };

  const renderHeader = () => {
    if (scrollPosition > 60) {
      return null;
    }
    return (
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setInfoModalVisible(true)}
        rightIcon={<InfoSvg />}
        centerIcon={<ProgressBar step={4} />}
      />
    );
  };

  const renderListItem = () => {
    return (
      <View style={styles.content}>
        <Title
          label="Please tell us more about your employment."
          style={styles.title}
        />
        <TextInput
          label="Employer"
          placeholder=""
          onChangeText={(val) => setEmployer(val)}
          text={employer}
          containerStyle={styles.textInput}
          error={errorEmployer}
          onSubmitEditing={handleNextPage}
        />
        <TextInput
          label="Position"
          placeholder=""
          onChangeText={(val) => setPosition(val)}
          text={position}
          containerStyle={styles.textInput}
          error={errorPosition}
          onSubmitEditing={handleNextPage}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <AppContainer style={styles.appContainer}>
        <FlatList
          data={['']}
          renderItem={renderListItem}
          keyExtractor={(item, index) => index}
          onScroll={(e) => {
            setScrollPosition(e.nativeEvent.contentOffset.y);
          }}
          style={styles.flatList}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={renderHeader}
        />
        <Bottom
          label="Continue"
          onPress={handleNextPage}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAwayStyle}
          isDisabled={!employer || !position}
        />
      </AppContainer>
      <Modal
        isVisible={isInfoModalVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setInfoModalVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel
          handleDismiss={() => setInfoModalVisible(false)}
          description="Let us know a bit more about your employment details. We're required to ask these questions for regulatory purposes."
        />
      </Modal>
    </SafeAreaView>
  );
};

export default ExtraEmploymentInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  appContainer: {
    paddingHorizontal: 0,
  },
  content: {
    paddingHorizontal: 30,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  title: {
    marginBottom: 14,
  },
  textInput: {
    marginTop: 37,
  },
  stickyTitle: {
    ...normalText,
    color: BLACK100,
    width: 205,
    textAlign: 'center',
  },
  flatList: {
    flex: 1,
    marginBottom: 10,
  },
  buttonWithKeyboardAwayStyle: {
    position: 'relative',
  },
});
