import React, { useMemo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import PortfolioComponent from '../../../components/home/Portfolio';
import { WHITE, GREEN800 } from '../../../theme/colors';
import ContributionSvg from '../../../assets/icons/home/contribution-icon.svg';
import PortfolioSvg from '../../../assets/icons/home/portfolio-green-icon.svg';
import TransactionSvg from '../../../assets/icons/home/Transaction-history-icon.svg';

const Portfolio = ({ navigation, isVisible }) => {
  const { user } = useSelector((state) => state.user);

  const portfolioList = useMemo(() => {
    const data = [
      {
        label1: 'Portfolio details',
        label2: 'View',
        icon: <PortfolioSvg />,
        onPress: () => navigation.navigate('HomePortfolio'),
      },
      {
        label1: 'Monthly contribution',
        label2: `$${user?.monthlyContribution || 0}`,
        icon: <ContributionSvg />,
        onPress: () => navigation.navigate('MonthlyContributionLoading'),
      },
    ];
    if (isVisible) {
      data.push({
        label1: 'Recent activity',
        label2: 'View',
        icon: <TransactionSvg />,
        onPress: () => navigation.navigate('Activity'),
      });
    }
    return data;
  }, [user, isVisible]);

  return (
    <View style={styles.activityFlatList}>
      <FlatList
        data={portfolioList}
        renderItem={({ item, index }) => (
          <PortfolioComponent
            item={item}
            isLastItem={portfolioList.length - 1 === index}
          />
        )}
        keyExtractor={(item, index) => `portfolio${index}`}
        scrollEnabled={false}
        listKey="portfolio"
      />
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  activityFlatList: {
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderColor: GREEN800,
    borderWidth: 1,
    borderRadius: 12,
  },
});
