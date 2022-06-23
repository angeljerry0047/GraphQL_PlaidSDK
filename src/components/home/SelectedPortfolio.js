import React, { useMemo } from 'react';
import { FlatList } from 'react-native';

import Chart from '../profile/PortfolioRelativeShareChart';
import SelectedPortfolioDescription from '../profile/SelectedPortfolioDescription';
import SelectedProfileItem from './SelectedPortfolioItem';

const SelectedPortfolio = ({ model, style, listKey, onPress }) => {
  const data = useMemo(() => {
    return model?.items || [];
  }, [model]);

  const renderListItem = ({ item, index }) => (
    <SelectedProfileItem
      item={item}
      index={index}
      dataLength={data?.length || 0}
      onPress={onPress}
    />
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
        scrollEnabled={false}
        listKey={listKey}
      />
    </>
  );
};

export default SelectedPortfolio;
