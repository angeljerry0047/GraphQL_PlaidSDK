import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { portfolioActions } from '../../actions/portfolio';
import { userActions } from '../../actions/user';
import Question from '../../components/profile/Question';
import { EACH_MONTH_CONTRIBUTE } from '../../utility/constants';
import { updateUserInformation } from '../../graphql/mutations';

const EachMonthContribute = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleNextPage = async (answer) => {
    const eachMonthContribution = EACH_MONTH_CONTRIBUTE.find(
      (el) => el.value === answer,
    ).contribution;

    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            eachMonthContribution,
            appStatus: {
              parent: 'Portfolio',
              sub: 'StockInquiries',
            },
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          eachMonthContribution,
          appStatus: {
            parent: 'Portfolio',
            sub: 'StockInquiries',
          },
        }),
      );

      dispatch(
        portfolioActions.setOriginalPortfolioAnswers({
          eachMonthContribution: answer,
        }),
      );
      navigation.navigate('StockInquiries');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Question
      navigation={navigation}
      onNextPage={handleNextPage}
      screenTopic="How much do you expect to be able to contribute to your portfolio each month?"
      step={7}
      list={EACH_MONTH_CONTRIBUTE}
      moreInfoText="Tell us how much you expect to regularly invest each month going forward. Your best guess is fine, and its ok if this number changes over time. We'll use this information to identify the best portfolio for you."
    />
  );
};

export default EachMonthContribute;
