import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { portfolioActions } from '../../actions/portfolio';
import { userActions } from '../../actions/user';
import Question from '../../components/profile/Question';
import { EMPLOYMENT_STATUS } from '../../utility/constants';
import { updateUserInformation } from '../../graphql/mutations';

const EmploymentStatus = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleNextPage = async (answer) => {
    const employmentStatus = EMPLOYMENT_STATUS.find(
      (el) => el.value === answer,
    ).apexValue;

    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            employment: {
              ...user.employment,
              employmentStatus: employmentStatus,
            },
            appStatus: {
              parent: 'Portfolio',
              sub: 'AnnualIncome',
            },
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          employment: {
            ...user.employment,
            employmentStatus: employmentStatus,
          },
          appStatus: {
            parent: 'Portfolio',
            sub: 'AnnualIncome',
          },
        }),
      );

      dispatch(
        portfolioActions.setOriginalPortfolioAnswers({
          employmentStatus: answer,
        }),
      );
      if (employmentStatus === 'EMPLOYED') {
        navigation.navigate('ExtraEmploymentInfo');
      } else {
        navigation.navigate('AnnualIncome');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Question
      navigation={navigation}
      onNextPage={handleNextPage}
      screenTopic="What is your employment status?"
      step={4}
      list={EMPLOYMENT_STATUS}
      moreInfoText="Tell us the status of your employment. We're required to ask this for regulatory purposes. We'll use this information to identify the best portfolio for you."
    />
  );
};

export default EmploymentStatus;
