import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import Header from '../../../components/common/Header';
import StickyHeader from '../../../components/common/StickyHeader';
import Loading from '../../../components/common/Loading';
import ActivityItem from '../../../components/home/Activities/Activity';
import ActivityTypeItem from '../../../components/home/Activities/ActivityType';
import { homeActions } from '../../../actions/home';

import {
  WHITE,
  WHITE400,
  BLACK100,
  BLACK200,
  GREY700,
  GREEN800,
} from '../../../theme/colors';
import { normalText, smallText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import DepositSvg from '../../../assets/icons/home/deposit-icon-small.svg';

const typeList = [
  { label: 'Investment', value: 'ACH_DEPOSIT' },
  { label: 'Withdrawal', value: 'ACH_WITHDRAWAL_LIQUIDATION' },
  // { label: 'Completed', value: 'Completed' },
  // { label: 'Processing', value: 'Processing_Requested_FundsPosted_Postponed' },
  // { label: 'Canceled', value: 'Canceled' },
  // { label: 'Failed', value: 'RejectedUnapproved_RejectedValidationFailed' },
];

const EmailInputView = ({ navigation }) => {
  const [position, setPosition] = useState(0);
  const [selectedItem, setSelectedItem] = useState('');
  const { user } = useSelector((state) => state.user);
  const { transactions, isLoading } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = `Bearer ${user?.jwt}`;
    dispatch(homeActions.getTransactionsRequest(token));
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const filterTransactions = (val) => {
    if (val === selectedItem) {
      return setSelectedItem('');
    }
    setSelectedItem(val);
  };

  const filteredTransactions = useMemo(() => {
    if (!selectedItem) {
      return transactions;
    }
    const filteredArr = transactions.filter(
      (v) =>
        selectedItem.includes(v.transferType) ||
        selectedItem.includes(v.transferState),
    );

    return filteredArr;
  }, [transactions, selectedItem]);

  const handleDetailTransfer = (item) => {
    let type = 'deposit';
    if (
      item.transferType.toLowerCase() === 'ach_withdrawal' ||
      item.transferType.toLowerCase() === 'liquidation'
    ) {
      type = 'withdrawal';
    }
    dispatch(homeActions.getTransactionDetailSuccess(item));
    navigation.navigate('TransactionDetail', {
      type,
      id: item.transferId,
    });
  };

  const handleCancelTransfer = (item) => {
    dispatch(homeActions.getTransactionDetailSuccess(item));
    navigation.navigate('TransactionCancel');
  };

  const renderItem = () => {
    return (
      <View style={styles.renderItem}>
        <FlatList
          data={typeList}
          renderItem={({ item }) => (
            <ActivityTypeItem
              item={item}
              onPress={filterTransactions}
              selectedItem={selectedItem}
            />
          )}
          keyExtractor={(item, index) => index}
          horizontal
          contentContainerStyle={styles.activityContainer}
          listKey="activity"
        />
        {filteredTransactions.length > 0 ? (
          <AppContainer flatList>
            <FlatList
              data={filteredTransactions}
              renderItem={({ item, index }) => (
                <ActivityItem
                  item={item}
                  handleDetailTransfer={handleDetailTransfer}
                  handleCancelTransfer={handleCancelTransfer}
                  isLastItem={filteredTransactions.length - 1 === index}
                />
              )}
              keyExtractor={(item, index) => index}
              listKey="transaction"
              style={styles.flatList}
            />
          </AppContainer>
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateIconContainer}>
              <DepositSvg />
            </View>
            <Text style={styles.emptyStateText}>
              No transactions to display
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <>
        <Header
          leftIcon={<ArrowBackSvg />}
          onPressLeft={goBack}
          containerStyle={styles.containerStyle}
        />
        <Title label="Activity" style={styles.title} />
      </>
    );
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        onPressLeft={goBack}
        leftIcon={<ArrowBackSvg />}
        centerIcon={<Text style={styles.stickyHeaderText}>Activity</Text>}
      />
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
      />
      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

export default EmailInputView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  containerStyle: {
    paddingTop: 10,
  },
  stickyHeaderText: {
    ...normalText,
    color: BLACK100,
  },
  renderItem: {
    marginTop: 16,
  },
  activityContainer: {
    paddingHorizontal: 30,
  },
  flatList: {
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderColor: GREEN800,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 36,
  },
  title: {
    paddingLeft: 30,
  },
  emptyStateContainer: {
    alignItems: 'center',
    marginTop: hp('21.6%'),
  },
  emptyStateIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: GREY700,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyStateText: {
    width: 130,
    color: BLACK200,
    ...smallText,
    textAlign: 'center',
  },
});
