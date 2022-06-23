import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import AppContainer from '../../components/common/AppContainer';
import SelectInput from '../../components/common/SelectInput';
import Bottom from '../../components/common/Bottom';
import Title from '../../components/common/Title';
import ErrorText from '../../components/common/ErrorText';
import TextInput from '../../components/common/TextInput';
import Header from '../../components/common/Header';
import Description from '../../components/common/Description';
import StickyHeader from '../../components/common/StickyHeader';
import InfoPanel from '../../components/profile/InfoPanel';
import ProgressBar from '../../components/profile/ProgressBar';
import { portfolioActions } from '../../actions/portfolio';
import {
  BLACK100,
  GREY500,
  WHITE,
  WHITE200,
  BLUE100,
} from '../../theme/colors';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';
import InfoSvg from '../../assets/icons/info-icon.svg';
import errorNormalizer from '../../services/errors/error-normalizer';
import { validationStr } from '../../utility';

const STOCK_INQUIRIES = [
  {
    value: 3,
    label: 'None of these apply to me.',
  },
  {
    value: 2,
    label:
      'I am (or a family member is) a senior executive or a 10% shareholder of a publicly traded company.',
    textInputLabel: 'Stock tickers (separate by comma if multiple)',
    name: 'shareHolder',
  },
  {
    value: 1,
    label:
      'I am (or a family member is) a politically exposed person or public official.',
    textInputLabel: 'Related political organization',
    bottomLabel: 'Immediate relatives of official (separate by comma)',
    name: 'politicalOrganization',
  },
  {
    value: 0,
    label: 'I work (or a family member works) for a brokerage firm.',
    textInputLabel: 'Brokerage name',
    name: 'brokerage',
  },
];

const noneApply = STOCK_INQUIRIES[0].value;
const shareHolder = STOCK_INQUIRIES[1].value;
const politicallyExposed = STOCK_INQUIRIES[2].value;
const reject = STOCK_INQUIRIES[3].value;

const StockInquiries = ({ navigation }) => {
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [answers, setAnswers] = useState([noneApply]);
  const [applyContents, setApplyContents] = useState({
    shareHolder: null,
    politicalOrganization: null,
    officialRelatives: null,
    brokerage: null,
  });
  const [position, setPosition] = useState(0);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.portfolio);

  const goBack = () => {
    navigation.goBack();
  };

  const continueDisabled = useMemo(() => {
    return (
      !answers.length ||
      answers.some((a) => {
        return (
          (a === shareHolder && !applyContents.shareHolder) ||
          (a === politicallyExposed &&
            (!applyContents.politicalOrganization ||
              !applyContents.officialRelatives))
        );
      })
    );
  }, [answers, applyContents]);

  const handleSelectedItem = (value) => {
    if (value === noneApply) {
      setApplyContents({
        shareHolder: null,
        politicalOrganization: null,
        officialRelatives: null,
        brokerage: null,
      });
      return setAnswers([value]);
    }

    let filteredAnswers = answers.filter((answer) => answer !== noneApply);
    if (answers.includes(value)) {
      filteredAnswers = filteredAnswers.filter((answer) => answer !== value);
      const name = STOCK_INQUIRIES.find((el) => el.value === value).name;
      const updateContent = {
        ...applyContents,
        [name]: null,
      };

      if (name === 'politicalOrganization') {
        updateContent.officialRelatives = null;
      }
      setApplyContents(updateContent);

      return setAnswers(filteredAnswers);
    }
    return setAnswers([...filteredAnswers, value]);
  };

  const handleChangeText = (name, text) => {
    if (!text || !text.trim()) {
      text = '';
    }
    if (validationStr(text) || text.length === 0) {
      setApplyContents({ ...applyContents, [name]: text });
    }
  };

  const handleNextPage = () => {
    if (answers.includes(reject)) {
      navigation.navigate('Reject');
      return;
    }

    dispatch(
      portfolioActions.setOriginalPortfolioAnswers({
        shareHolder: applyContents.shareHolder,
        politicalOrganization: applyContents.politicalOrganization,
        officialRelatives: applyContents.officialRelatives,
        brokerage: applyContents.brokerage,
      }),
    );
    navigation.navigate('Disclosure');
  };

  const renderListItem = ({ item }) => (
    <>
      <SelectInput
        item={item}
        handleSelectedItem={handleSelectedItem}
        containerStyle={styles.selectInput}
        selectedItems={answers}
        textStyle={styles.buttonTextStyle}
        iconStyle={styles.iconStyle}
        isIcon
      />
      {item.value !== noneApply &&
        item.value !== reject &&
        answers.includes(item.value) && (
          <>
            <TextInput
              label={item.textInputLabel}
              placeholder=""
              onChangeText={(text) => handleChangeText(item.name, text)}
              text={applyContents[item.name]}
              onSubmitEditing={handleNextPage}
              autoFocus={true}
              containerStyle={styles.textInput}
              autoCorrect={false}
            />
            {item.value === STOCK_INQUIRIES[2].value && (
              <TextInput
                label="Immediate relatives of official (separate by comma)"
                placeholder=""
                onChangeText={(text) =>
                  handleChangeText('officialRelatives', text)
                }
                text={applyContents.officialRelatives}
                onSubmitEditing={handleNextPage}
                containerStyle={styles.textInput}
                autoCorrect={false}
              />
            )}
          </>
        )}
    </>
  );

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        onPressRight={() => setInfoModalVisible(true)}
        rightIcon={<InfoSvg />}
        centerIcon={
          <Description
            description="Do any of these apply to you?"
            style={styles.header}
            textStyle={styles.headerText}
          />
        }
      />
    );
  };

  const renderItem = () => {
    return (
      <>
        <Header
          leftIcon={<ArrowBackSvg />}
          onPressLeft={goBack}
          onPressRight={() => setInfoModalVisible(true)}
          rightIcon={<InfoSvg />}
          centerIcon={<ProgressBar step={8} />}
        />
        <View style={styles.content}>
          <Title label="Do any of these apply to you?" />
          {!!error && (
            <ErrorText
              error={errorNormalizer(error)}
              errorContainer={styles.errorContainer}
            />
          )}
          <Description description="These don’t apply to most people but let us know if they apply to you." />
          <FlatList
            data={STOCK_INQUIRIES}
            renderItem={renderListItem}
            keyExtractor={(item, index) => `${item.label}${index}`}
            nestedScrollEnabled
            style={styles.answerList}
          />
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <AppContainer style={styles.appContainer}>
        <FlatList
          data={['']}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          onScroll={(e) => {
            setPosition(e.nativeEvent.contentOffset.y);
          }}
          style={styles.flatList}
          keyboardShouldPersistTaps="handled"
        />

        <Bottom
          label="Continue"
          onPress={handleNextPage}
          isDisabled={continueDisabled}
          isLoading={isLoading}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAway}
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
          description="Tell us about your personal or professional affiliations. We're required to ask these questions for regulatory purposes."
        />
      </Modal>
    </SafeAreaView>
  );
};

export default StockInquiries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: { marginTop: 0 },
  headerText: { color: BLACK100 },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  selectInput: {
    marginTop: 25,
  },
  bottomContainerStyle: {
    backgroundColor: GREY500,
  },
  textInput: {
    marginTop: 25,
  },
  appContainer: {
    paddingHorizontal: 0,
  },
  content: {
    paddingHorizontal: 30,
  },
  flatList: {
    flex: 1,
    marginBottom: 10,
  },
  errorContainer: {
    marginBottom: 0,
  },
  buttonTextStyle: {
    width: Dimensions.get('screen').width - 126,
  },
  iconStyle: {
    position: 'absolute',
    right: 20,
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
  answerList: {
    marginTop: 11,
  },
});
