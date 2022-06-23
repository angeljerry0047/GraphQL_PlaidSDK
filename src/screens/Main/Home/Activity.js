import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ActivityComponent from '../../../components/home/Activities/Activity';
import { homeActions } from '../../../actions/home';
import { WHITE, BLACK100, GREEN800 } from '../../../theme/colors';
import { veryLargeText, mediumText } from '../../../theme/fonts';
import ForwardSvg from '../../../assets/icons/home/Forward-black-icon.svg';

const Activity = ({ navigation }) => {
  const { transactions } = useSelector((state) => state.home);

  const dispatch = useDispatch();

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

  if (transactions.length > 0) {
    return (
      <View>
        <Text style={styles.label}>Activity</Text>
        <View style={styles.activityFlatList}>
          <FlatList
            data={transactions.slice(0, 2)}
            renderItem={({ item }) => (
              <ActivityComponent
                item={item}
                handleDetailTransfer={handleDetailTransfer}
                handleCancelTransfer={handleCancelTransfer}
              />
            )}
            keyExtractor={(item, index) => `activities${index}`}
            scrollEnabled={false}
            listKey="activities"
          />
          <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
            <View style={styles.allContainer}>
              <Text style={styles.viewAll}>View all activity</Text>
              <ForwardSvg />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return null;
};

export default Activity;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingRight: 40,
  },
  activityFlatList: {
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderColor: GREEN800,
    borderWidth: 1,
    borderRadius: 12,
  },
  label: {
    ...veryLargeText,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 43,
  },
  viewAll: {
    ...mediumText,
    color: BLACK100,
  },
  allContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
});
