import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { portfolioActions } from '../../actions/portfolio';
import { userActions } from '../../actions/user';
import Question from '../../components/profile/Question';
import { ESTIMATED_NET_WORTH } from '../../utility/constants';
import { updateUserInformation } from '../../graphql/mutations';

const EstimatedNetWorth = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleNextPage = async (answer) => {
    const totalNetWorth = ESTIMATED_NET_WORTH.find((el) => el.value === answer);

    const totalNetWorthUSD = totalNetWorth.apexValue;
    const totalNetWorthUSDOrg = totalNetWorth.label;

    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            investmentProfile: {
              ...user.investmentProfile,
              totalNetWorthUSD,
              totalNetWorthUSDOrg,
            },
            appStatus: {
              parent: 'Portfolio',
              sub: 'EachMonthContribute',
            },
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          investmentProfile: {
            ...user.investmentProfile,
            totalNetWorthUSD,
            totalNetWorthUSDOrg,
          },
          appStatus: {
            parent: 'Portfolio',
            sub: 'EachMonthContribute',
          },
        }),
      );

      dispatch(
        portfolioActions.setOriginalPortfolioAnswers({
          totalNetWorthUSD: answer,
        }),
      );

      navigation.navigate('EachMonthContribute');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Question
      navigation={navigation}
      onNextPage={handleNextPage}
      screenTopic="What is your estimated net worth?"
      step={6}
      list={ESTIMATED_NET_WORTH}
      description="Your net worth is all of your money (cash, bank accounts, investments, property) minus all of your debt (credit cards, loans)."
      moreInfoText="Tell us your estimated net worth. We're required to ask for regulatory purposes, and it helps us better understand where you are on your financial journey. Don't sweat the little stuff - ballpark estimate is fine."
    />
  );
};

export default EstimatedNetWorth;
