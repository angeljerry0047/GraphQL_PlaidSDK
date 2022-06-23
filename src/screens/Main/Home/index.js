import React, { useState, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../components/common/AppContainer';
import Header from '../../../components/common/Header';
import StickyHeader from '../../../components/common/StickyHeader';
import Loading from '../../../components/common/Loading';
import Title from '../../../components/common/Title';
import BalanceChart from '../../../components/home/BalanceChart';
import Notification from './Notification';
import Activity from './Activity';
import Story from './Story';
import Portfolio from './Portfolio';
// import NotificationService from '../../../services/notification';
import { homeActions } from '../../../actions/home';
import { portfolioActions } from '../../../actions/portfolio';
import {
  WHITE,
  WHITE400,
  BLACK100,
  GREEN800,
  GREEN500,
  GREEN400,
  GREEN1100,
  GREEN1300,
  RED300,
  RED400,
  BLUE200,
} from '../../../theme/colors';
import {
  extraLargeText,
  veryLargeText,
  normalText,
  smallText,
  verySmallText,
} from '../../../theme/fonts';

const { width } = Dimensions.get('screen');

const Home = ({ navigation }) => {
  const [position, setPosition] = useState(0);
  const { user } = useSelector((state) => state.user);
  const {
    storyLoading,
    transactionIsLoading,
    balanceIsLoading,
    apexBalanceIsLoading,
  } = useSelector((state) => state.home);
  const {
    linkToken,
    isLoadingApexBalanceAmount,
    isLoadingPlaidLinkToken,
    apexBalance,
  } = useSelector((state) => state.portfolio);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = `Bearer ${user?.jwt}`;
    dispatch(portfolioActions.loadAllModelsRequest());
    dispatch(portfolioActions.getApexAccountRequest({ token }));
    dispatch(homeActions.getTransactionsRequest(token));
    dispatch(homeActions.getBalanceRequest(token));
    dispatch(homeActions.getApexBalanceRequest(token));
    dispatch(homeActions.getStoriesRequest());
    dispatch(portfolioActions.getApexBalanceAmountRequest());
    dispatch(portfolioActions.getPlaidLinkTokenRequest({ token }));
    // NotificationService();
  }, []);

  const isLoading = useMemo(() => {
    if (
      transactionIsLoading ||
      balanceIsLoading ||
      apexBalanceIsLoading ||
      isLoadingApexBalanceAmount ||
      isLoadingPlaidLinkToken ||
      storyLoading
    ) {
      return true;
    }
    return false;
  }, [
    transactionIsLoading,
    balanceIsLoading,
    apexBalanceIsLoading,
    isLoadingApexBalanceAmount,
    isLoadingPlaidLinkToken,
    storyLoading,
  ]);

  useEffect(() => {
    if (linkToken) {
      const token = `Bearer ${user?.jwt}`;
      dispatch(portfolioActions.getPlaidAccountDetailRequest(token));
    }
  }, [linkToken]);

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <Header
        leftIcon={<Text style={styles.headerLeft}>Hey {user?.firstName}</Text>}
        rightIcon={
          <View style={styles.placeholder}>
            <Text style={styles.name}>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </Text>
          </View>
        }
        rightStyle={styles.right}
        containerStyle={styles.header}
      />
    );
  };

  const renderFooter = () => {
    if (isLoading) {
      return null;
    }
    return <Story navigation={navigation} />;
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        leftIcon={
          <Text style={styles.fixedHeaderLeft}>Hey {user?.firstName}</Text>
        }
        leftStyle={styles.stickyLeft}
        rightIcon={
          <View style={styles.placeholder}>
            <Text style={styles.name}>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </Text>
          </View>
        }
        rightStyle={styles.stickyRight}
      />
    );
  };

  const balanceDiff = useMemo(() => {
    if (apexBalance?.graphData?.ALL?.diff > 0) {
      return `+$${Number(apexBalance?.graphData?.ALL?.diff).toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      )}`;
    }
    return `-$${Math.abs(apexBalance?.graphData?.ALL?.diff || 0)?.toFixed(2)}`;
  }, [apexBalance]);

  const chartData = useMemo(() => {
    const data = apexBalance?.graphData?.ALL.data.map((v) => v.totalEquity);
    return data || [];
  }, [apexBalance]);

  const isPositive = useMemo(() => {
    return apexBalance?.graphData?.ALL?.diff > 0;
  }, [apexBalance]);

  const renderItem = () => {
    if (isLoading) {
      return null;
    }

    return (
      <>
        <Notification navigation={navigation} />
        <AppContainer flatList>
          <Text style={styles.label}>Portfolio</Text>
          {!!apexBalance?.balance &&
            apexBalance?.graphData?.ALL.data.length > 3 && (
              <View style={styles.chartContainer}>
                <View style={styles.apexBalance}>
                  <Title
                    label={`$${Number(apexBalance?.balance || 0).toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}`}
                  />
                  <Text style={isPositive ? styles.plus : styles.minus}>
                    {balanceDiff}{' '}
                    {`(${apexBalance?.graphData?.ALL?.percentDiff.toFixed(
                      2,
                    )}%)`}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PortfolioValue')}>
                  <BalanceChart
                    style={styles.chartStyle}
                    data={chartData}
                    lineColor={isPositive ? GREEN1100 : RED400}
                    gradientStartColor={isPositive ? GREEN400 : RED400}
                    gradientStartOpacity={isPositive ? 0.2 : 0.1}
                  />
                </TouchableOpacity>
              </View>
            )}

          <Portfolio navigation={navigation} />
          <Activity navigation={navigation} />
        </AppContainer>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <FlatList
        data={['']}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        onScroll={(e) => setPosition(e.nativeEvent.contentOffset.y)}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  header: {
    paddingTop: 2,
    marginBottom: 23,
    height: 65,
  },
  right: {
    paddingTop: 12,
    paddingBottom: 11,
  },
  headerLeft: {
    color: BLACK100,
    ...extraLargeText,
    textTransform: 'capitalize',
  },
  fixedHeaderLeft: {
    color: BLACK100,
    ...normalText,
    textTransform: 'capitalize',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BLUE200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...veryLargeText,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 43,
  },
  name: {
    ...smallText,
    color: GREEN500,
  },
  stickyLeft: {
    paddingTop: 13,
    paddingBottom: 20,
  },
  stickyRight: {
    paddingTop: 2,
    paddingBottom: 10,
  },
  chartContainer: {
    marginBottom: 30,
    backgroundColor: WHITE,
    borderColor: GREEN800,
    borderRadius: 12,
    borderWidth: 1,
    paddingBottom: 20,
  },
  chartStyle: {
    height: 130,
    marginTop: 26,
    width: width - 62, // 60 AppContainer paddingHorizontal + 2 chartContainer borderWidth = 62
  },
  apexBalance: {
    paddingTop: 22,
    paddingLeft: 28,
  },
  plus: {
    color: GREEN1300,
    ...verySmallText,
    marginTop: 5,
  },
  minus: {
    color: RED300,
    ...verySmallText,
    marginTop: 5,
  },
});
