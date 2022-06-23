import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { portfolioActions } from '../../actions/portfolio';
import { userActions } from '../../actions/user';
import Question from '../../components/profile/Question';
import { ANNUAL_INCOME } from '../../utility/constants';
import { updateUserInformation } from '../../graphql/mutations';

const AnnualIncome = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleNextPage = async (answer) => {
    const annualIncomeUSD = ANNUAL_INCOME.find(
      (el) => el.value === answer,
    ).apexValue;
    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            investmentProfile: {
              ...user.investmentProfile,
              annualIncomeUSD,
            },
            appStatus: {
              parent: 'Portfolio',
              sub: 'EstimatedNetWorth',
            },
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          investmentProfile: {
            ...user.investmentProfile,
            annualIncomeUSD,
          },
          appStatus: {
            parent: 'Portfolio',
            sub: 'EstimatedNetWorth',
          },
        }),
      );

      dispatch(
        portfolioActions.setOriginalPortfolioAnswers({
          annualIncomeUSD: answer,
        }),
      );
      navigation.navigate('EstimatedNetWorth');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Question
      navigation={navigation}
      onNextPage={handleNextPage}
      screenTopic="What is your annual income?"
      step={5}
      list={ANNUAL_INCOME}
      moreInfoText="Tell us how much you expect to make this year. We're required to ask for regulatory purposes, and it helps us better understand where you are on your financial journey. Don't sweat the little stuff - ballpark estimate is fine."
    />
  );
};

export default AnnualIncome;
