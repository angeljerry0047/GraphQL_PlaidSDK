import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import SelectInput from '../common/SelectInput';
import Bottom from '../common/Bottom';
import Title from '../common/Title';
import Header from '../common/Header';
import StickyHeader from '../common/StickyHeader';

import InfoPanel from './InfoPanel';
import ProgressBar from './ProgressBar';
import {
  GREY100,
  GREY500,
  WHITE,
  WHITE200,
  BLACK100,
  BLUE100,
} from '../../theme/colors';
import { normalText } from '../../theme/fonts';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';
import InfoSvg from '../../assets/icons/large-Info-icon.svg';
import Description from '../common/Description';

const Question = ({
  navigation,
  list,
  onNextPage,
  multiChoice,
  screenTopic,
  step,
  description,
  moreInfoText,
}) => {
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [position, setPosition] = useState(0);

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {
    onNextPage(answers);
  };

  const handleSelectedItem = (type) => {
    if (multiChoice) {
      if (!answers.includes(type)) {
        return setAnswers([...answers, type]);
      }
      const filterUnselectedAnswers = answers.filter(
        (answer) => answer !== type,
      );
      return setAnswers(filterUnselectedAnswers);
    }
    onNextPage(type);
  };

  const renderListItem = () => (
    <>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        onPressRight={() => setInfoModalVisible(true)}
        rightIcon={<InfoSvg />}
        centerIcon={<ProgressBar step={step} />}
      />
      <View style={styles.content}>
        <Title label={screenTopic} />
        {!!description && <Description description={description} />}
        <View style={styles.answersContainer}>
          {list.map((item, index) => (
            <SelectInput
              item={item}
              key={`item${index}`}
              handleSelectedItem={handleSelectedItem}
              containerStyle={styles.selectInput}
              selectedItems={multiChoice ? answers : []}
              isIcon
            />
          ))}
        </View>
      </View>
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
        centerIcon={
          <Text numberOfLines={1} style={styles.stickyTitle}>
            {screenTopic}
          </Text>
        }
        onPressRight={() => setInfoModalVisible(true)}
        rightIcon={<InfoSvg />}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <FlatList
        data={['']}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index}
        onScroll={(e) => {
          setPosition(e.nativeEvent.contentOffset.y);
        }}
        style={styles.flatList}
      />
      {multiChoice && (
        <Bottom
          label="Continue"
          onPress={handleNextPage}
          isDisabled={!answers.length}
          buttonWithKeyboardAwayStyle={[
            styles.buttonWithKeyboardAway,
            step === 3 && styles.hasBorder,
          ]}
        />
      )}
      <Modal
        isVisible={isInfoModalVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setInfoModalVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel
          handleDismiss={() => setInfoModalVisible(false)}
          description={moreInfoText}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
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
  hasBorder: {
    ...ifIphoneX(
      {},
      {
        borderTopColor: WHITE200,
        borderTopWidth: 1,
      },
    ),
  },
  bottomButtonStyle: {
    color: GREY100,
  },
  flatList: {},
  buttonWithKeyboardAway: {
    position: 'relative',
  },
  content: {
    paddingHorizontal: 30,
  },
  stickyTitle: {
    ...normalText,
    color: BLACK100,
    width: 205,
    textAlign: 'center',
  },
  answersContainer: {
    marginTop: 11,
  },
});
