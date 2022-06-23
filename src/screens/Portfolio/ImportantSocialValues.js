import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { portfolioActions } from '../../actions/portfolio';
import { userActions } from '../../actions/user';
import Question from '../../components/profile/Question';
import { IMPORTANT_SOCIAL_VALUES } from '../../utility/constants';
import { updateUserInformation } from '../../graphql/mutations';

const ImportantSocialValues = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleNextPage = async (answers) => {
    const socialValues = IMPORTANT_SOCIAL_VALUES.reduce(
      (acc, cur) => (answers.includes(cur.value) ? [...acc, cur.label] : acc),
      [],
    );
    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            socialValues,
            appStatus: {
              parent: 'Portfolio',
              sub: 'EmploymentStatus',
            },
          },
        }),
      );

      dispatch(
        userActions.setUserInfo({
          socialValues,
          appStatus: {
            parent: 'Portfolio',
            sub: 'EmploymentStatus',
          },
        }),
      );

      dispatch(
        portfolioActions.setOriginalPortfolioAnswers({
          socialValues: answers,
        }),
      );
      navigation.navigate('EmploymentStatus');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Question
      navigation={navigation}
      onNextPage={handleNextPage}
      screenTopic="What social issues are most important to you?"
      step={3}
      list={IMPORTANT_SOCIAL_VALUES}
      multiChoice
      moreInfoText="Tell us what social issues are most important to you as an investor and consumer. We'll use this information to tailor investment products for you."
    />
  );
};

export default ImportantSocialValues;
