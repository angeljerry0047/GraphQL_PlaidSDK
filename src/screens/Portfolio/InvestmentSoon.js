import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { portfolioActions } from '../../actions/portfolio';
import { userActions } from '../../actions/user';
import Question from '../../components/profile/Question';
import { INVEST_SOON } from '../../utility/constants';
import { updateUserInformation } from '../../graphql/mutations';

const InvestmentSoon = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleNextPage = async (answer) => {
    const timeHorizon = INVEST_SOON.find((el) => el.value === answer);

    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            timeHorizon: timeHorizon.apexValue,
            timeHorizonOrg: timeHorizon.label,
            appStatus: {
              parent: 'Portfolio',
              sub: 'ImportantSocialValues',
            },
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          timeHorizon: timeHorizon.apexValue,
          timeHorizonOrg: timeHorizon.label,
          appStatus: {
            parent: 'Portfolio',
            sub: 'ImportantSocialValues',
          },
        }),
      );

      dispatch(
        portfolioActions.setOriginalPortfolioAnswers({
          timeHorizon: answer,
        }),
      );

      navigation.navigate('ImportantSocialValues');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Question
      navigation={navigation}
      onNextPage={handleNextPage}
      screenTopic="How soon will you need to use some of your investment?"
      step={2}
      list={INVEST_SOON}
      moreInfoText="Tell us when you'll need to use the proceeds from your investments. Your best guess is fine. We'll use this information to identify the best portfolio for your needs."
    />
  );
};

export default InvestmentSoon;
