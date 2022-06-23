import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { portfolioActions } from '../../actions/portfolio';
import { userActions } from '../../actions/user';
import Question from '../../components/profile/Question';
import { INVEST_GOALS } from '../../utility/constants';
import { updateUserInformation } from '../../graphql/mutations';

const InvestGoals = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleNextPage = async (answer) => {
    const investmentObjective = INVEST_GOALS.find(
      (el) => el.value === answer,
    ).apexValue;

    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            investmentProfile: {
              ...user.investmentProfile,
              investmentObjective,
            },
            appStatus: {
              parent: 'Portfolio',
              sub: 'InvestmentSoon',
            },
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          investmentProfile: {
            ...user.investmentProfile,
            investmentObjective,
          },
          appStatus: {
            parent: 'Portfolio',
            sub: 'InvestmentSoon',
          },
        }),
      );

      dispatch(
        portfolioActions.setOriginalPortfolioAnswers({
          investmentObjective: answer,
        }),
      );

      navigation.navigate('InvestmentSoon');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Question
      navigation={navigation}
      onNextPage={handleNextPage}
      screenTopic="What is your primary goal for investing?"
      step={1}
      list={INVEST_GOALS}
      moreInfoText="Tell us a bit more about what you're working towards. We'll use this information to identify the best portfolio for your needs."
    />
  );
};

export default InvestGoals;
