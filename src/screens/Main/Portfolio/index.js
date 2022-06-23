import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native';

import Header from '../../../components/common/Header';
import StickyHeader from '../../../components/common/StickyHeader';
import Loading from '../../../components/common/Loading';
import AppContainer from '../../../components/common/AppContainer';
import SelectedProfileItem from '../../../components/home/SelectedPortfolioItem';
import Chart from '../../../components/profile/PortfolioRelativeShareChart';
import PortfolioComponent from '../../../components/home/Portfolio';
import { modelsSelector } from '../../../selectors/portfolio';
import {
  WHITE400,
  WHITE,
  BLACK100,
  GREEN800,
  BLUE200,
} from '../../../theme/colors';
import {
  extraLargeText,
  normalText,
  verySmallText,
} from '../../../theme/fonts';
import { portfolioActions } from '../../../actions/portfolio';
import { homeActions } from '../../../actions/home';
import BulbSvg from '../../../assets/icons/home/Bulb-green-icon.svg';
import ContributionSvg from '../../../assets/icons/home/contribution-icon.svg';
import BalancedSvg from '../../../assets/icons/home/Balanced-portfolio-icon.svg';
import TransactionSvg from '../../../assets/icons/home/Transaction-history-icon.svg';
import InvestorSvg from '../../../assets/icons/home/Investor-profile-icon.svg';
import ModerateSvg from '../../../assets/icons/home/Moderate-portfolio-icon.svg';
import AggressiveSvg from '../../../assets/icons/home/Aggressive-portfolio-icon.svg';

const Portfolio = ({ navigation }) => {
  const [recommendedPortfolio, setRecommendedPortfolio] = useState('Moderate');
  const [position, setPosition] = useState(0);

  const { user } = useSelector((state) => state.user);
  const { isLoadingModels, apexBalance, modelId } = useSelector(
    (state) => state.portfolio,
  );
  const models = useSelector(modelsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = `Bearer ${user?.jwt}`;
    dispatch(portfolioActions.getPortfolioRequest(token));
  }, []);

  useEffect(() => {
    if (models && modelId) {
      const data = Object.values(models);
      const recommended = data.find((v) => v.id === modelId);
      setRecommendedPortfolio(recommended?.name);
    }
  }, [models, modelId]);

  const portfolioList = useMemo(() => {
    let icon;
    if (recommendedPortfolio === 'Moderate') {
      icon = <ModerateSvg />;
    } else if (recommendedPortfolio === 'Aggressive') {
      icon = <AggressiveSvg />;
    } else {
      icon = <BalancedSvg />;
    }
    return [
      {
        label1: 'Portfolio type',
        label2: `${recommendedPortfolio}`,
        icon: icon,
        onPress: () =>
          navigation.navigate('OtherPortfolio', {
            currentPortfolio: recommendedPortfolio,
          }),
        isHidden: recommendedPortfolio === 'Balanced',
      },
      {
        label1: 'Monthly contribution',
        label2: `$${user?.monthlyContribution || 0}`,
        icon: <ContributionSvg />,
        onPress: () => navigation.navigate('MonthlyContributionLoading'),
      },
      {
        label1: 'Recent activity',
        label2: 'View',
        icon: <TransactionSvg />,
        onPress: () => navigation.navigate('Activity'),
      },
      // {
      //   label1: 'Investor profile',
      //   label2: 'View',
      //   icon: <InvestorSvg />,
      // },
    ];
  }, [user, recommendedPortfolio]);

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <Header
        leftIcon={
          <View>
            <Text style={styles.headerLeft}>Portfolio</Text>

            <Text style={styles.subTitle}>
              Value:{' '}
              {apexBalance
                ? `$${Number(apexBalance.balance).toLocaleString('en-US')}`
                : 'First deposit pending'}
            </Text>
          </View>
        }
        rightIcon={
          <View style={styles.placeholder}>
            <BulbSvg />
          </View>
        }
        containerStyle={styles.header}
        leftStyle={styles.left}
        rightStyle={styles.right}
      />
    );
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        leftIcon={<Text style={styles.fixedHeaderLeft}>Portfolio</Text>}
        rightIcon={
          <View style={styles.placeholder}>
            <BulbSvg />
          </View>
        }
        leftStyle={styles.headerStickyLeft}
        rightStyle={styles.headerStickyRight}
      />
    );
  };

  const handleFundDetail = (val) => {
    dispatch(homeActions.setStock(val));
    navigation.navigate('FundDetail', { cusip: val.cusip });
  };

  const renderItem = () => {
    return (
      <AppContainer flatList style={styles.appContainer}>
        {isLoadingModels && <Loading />}
        <Chart model={models?.[recommendedPortfolio]} />
        <View style={[styles.activityFlatList, styles.recommendedPortfolio]}>
          <FlatList
            data={models?.[recommendedPortfolio]?.items || []}
            renderItem={({ item, index }) => (
              <SelectedProfileItem
                item={item}
                index={index}
                dataLength={models?.[recommendedPortfolio]?.items?.length}
                onPress={handleFundDetail}
              />
            )}
            keyExtractor={(item, index) => `chart${index}`}
            scrollEnabled={false}
            listKey="chart"
          />
        </View>
        <View style={styles.activityFlatList}>
          <FlatList
            data={portfolioList}
            renderItem={({ item, index }) => (
              <PortfolioComponent
                item={item}
                isLastItem={index === portfolioList.length - 1}
              />
            )}
            keyExtractor={(item, index) => `portfolio${index}`}
            scrollEnabled={false}
            listKey="portfolio"
          />
        </View>
      </AppContainer>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <FlatList
        data={['']}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        onScroll={(e) => setPosition(e.nativeEvent.contentOffset.y)}
        nestedScrollEnabled
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  header: {
    paddingTop: 2,
    marginBottom: 30,
    height: 85,
  },
  appContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  activityFlatList: {
    width: '100%',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderColor: GREEN800,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 30,
  },
  recommendedPortfolio: {
    marginTop: 47,
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BLUE200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeft: {
    color: BLACK100,
    ...extraLargeText,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  fixedHeaderLeft: {
    color: BLACK100,
    ...normalText,
    textTransform: 'capitalize',
  },
  subTitle: {
    color: BLACK100,
    ...verySmallText,
    paddingTop: 0,
    paddingBottom: 15,
  },
  right: {
    paddingTop: 12,
    paddingBottom: 31,
  },
  left: {
    paddingBottom: 0,
  },
  headerStickyLeft: {
    paddingTop: 13,
    paddingBottom: 20,
  },
  headerStickyRight: {
    paddingTop: 2,
    paddingBottom: 10,
  },
});
