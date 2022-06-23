import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import Bottom from '../../components/common/Bottom';
import Button from '../../components/common/Button';
import Description from '../../components/common/Description';
import Header from '../../components/common/Header';
import StickyHeader from '../../components/common/StickyHeader';
import Title from '../../components/common/Title';
import SelectInput from '../../components/common/SelectInput';
import { WHITE, GREY500, BLUE100, BLACK100 } from '../../theme/colors';
import { normalText } from '../../theme/fonts';

import { statusActions } from '../../actions/status';
import { userActions } from '../../actions/user';
import { updateUserInformation } from '../../graphql/mutations';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';

const Contribution = ({ route, navigation }) => {
  const [answers, setAnswers] = useState([3]);
  const [contributions, setContributions] = useState([]);
  const [position, setPosition] = useState(0);
  const { portfolio } = useSelector((state) => state.portfolio);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (answers[0] === 0) {
      navigation.navigate('MonthlyContribution', {
        from: route?.params?.from,
      });
    }
  }, [answers]);

  useEffect(() => {
    const { eachMonthContribution } = user;
    const data = [];
    for (let i = 0; i < 3; i++) {
      const temp = {
        label: `$${
          Math.ceil((eachMonthContribution * 1.5) / 10) * 10 + i * 10
        }/month`,
        value: Math.ceil((eachMonthContribution * 1.5) / 10) * 10 + i * 10,
      };
      data.push(temp);
    }
    data.push({
      value: 0,
      label: 'Enter a different amount',
    });
    setContributions(data);
  }, [portfolio]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = async () => {
    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            monthlyContribution: answers[0],
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          monthlyContribution: answers[0],
        }),
      );

      if (route?.params?.from === 'confirmSchedule') {
        return navigation.navigate('ConfirmSchedule');
      }

      dispatch(
        statusActions.setAppCurrentStatus({
          parent: 'Portfolio',
          sub: 'BankFee',
        }),
      );
      navigation.navigate('BankFee');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectedItem = (type) => {
    if (!answers.includes(type)) {
      return setAnswers([type]);
    }
    const filterUnselectedAnswers = answers.filter((answer) => answer !== type);
    return setAnswers(filterUnselectedAnswers);
  };

  const handleCalculator = () => {
    navigation.push('Historical', { from: 'contribution' });
  };

  const renderListItem = () => (
    <>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <View style={styles.content}>
        <Title label="Set a monthly contribution." />
        <Description
          description={`We think contributing ${contributions[0]?.label} to your portfolio is a good place to start. You can always adjust this later.`}
          style={styles.description}
        />
        {contributions.map((item, index) => (
          <SelectInput
            item={item}
            handleSelectedItem={handleSelectedItem}
            containerStyle={styles.selectInput}
            selectedItems={answers}
            isIcon
            key={index}
          />
        ))}
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
            Set a monthly contribution.
          </Text>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <FlatList
        data={['']}
        renderItem={renderListItem}
        keyExtractor={(item, index) => `${item.label}${index}`}
        onScroll={(e) => {
          setPosition(e.nativeEvent.contentOffset.y);
        }}
        style={styles.flatList}
      />
      <Bottom
        label="Continue"
        onPress={handleNextPage}
        buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAway}>
        <Button
          label="View returns calculator"
          onPress={handleCalculator}
          style={styles.closeButton}
          textStyle={styles.text}
        />
      </Bottom>
    </SafeAreaView>
  );
};

export default Contribution;

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
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  flatList: {
    marginBottom: 60,
  },

  stickyTitle: {
    ...normalText,
    color: BLACK100,
    width: 205,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 30,
  },
  buttonWithKeyboardAway: {
    position: 'relative',
  },
});
