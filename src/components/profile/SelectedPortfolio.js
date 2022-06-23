import React, { useMemo } from 'react';
import { FlatList } from 'react-native';

import Chart from './PortfolioRelativeShareChart';
import SelectedProfileItem from './SelectedPortfolioItem';
import SelectedPortfolioDescription from './SelectedPortfolioDescription';

const SelectedPortfolio = ({ model, style }) => {
  const data = useMemo(() => {
    return model?.items || [];
  }, [model]);

  const renderListItem = ({ item, index }) => (
    <SelectedProfileItem item={item} index={index} dataLength={data.length} />
  );

  return (
    <>
      <SelectedPortfolioDescription description={model?.description} />
      <Chart model={model} />
      <FlatList
        data={data}
        renderItem={renderListItem}
        keyExtractor={(item, index) => `${item.label}${index}`}
        style={style}
        nestedScrollEnabled
      />
    </>
  );
};

export default SelectedPortfolio;
