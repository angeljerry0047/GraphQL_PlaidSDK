import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import Loading from '../../components/profile/Loading';
import { portfolioActions } from '../../actions/portfolio';

const PortfolioAnalyzing = ({ navigation }) => {
  const [minimumWaitReached, setMinimumWaitReached] = useState(false);

  const { isLoadingModels } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(portfolioActions.loadAllModelsRequest());
  }, []);

  useEffect(() => {
    if (minimumWaitReached && !isLoadingModels) {
      navigation.navigate('SelectedPortfolio');
    }
  }, [minimumWaitReached, isLoadingModels]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setMinimumWaitReached(true);
      }, 1000);
      return () => {
        setMinimumWaitReached(false);
      };
    }, []),
  );

  return (
    <Loading
      description1="Based on your responses, we are determining the right portfolio for you."
      description2="Analyzing..."
    />
  );
};

export default PortfolioAnalyzing;
