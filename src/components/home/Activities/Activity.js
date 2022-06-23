import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import { BLACK100, BLACK200, WHITE, GREEN800 } from '../../../theme/colors';
import { normalText, smallText } from '../../../theme/fonts';
import DepositGreenSvg from '../../../assets/icons/home/deposit-green-icon.svg';
import WithdrawalSvg from '../../../assets/icons/home/withdrawal-red-icon.svg';
import {
  capitalizeFirstLetter,
  transferState as selectTransferState,
} from '../../../utility';

const Activity = ({
  item,
  isLastItem,
  handleDetailTransfer,
  handleCancelTransfer,
}) => {
  const { transferState, occurrences, amount, dateOfTransfer, transferType } =
    item;
  const isWithdrawal =
    transferType.toLowerCase() === 'ach_withdrawal' ||
    transferType.toLowerCase() === 'liquidation';

  const description = () => {
    const sign = isWithdrawal ? '-' : '+';
    if (dateOfTransfer && transferState) {
      return (
        <Text style={styles.description}>
          {`${sign}$${Number(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} • ${selectTransferState(transferState)} • ${moment(
            dateOfTransfer,
          ).format('MM/DD/YY')}`}
        </Text>
      );
    } else {
      return (
        <Text style={styles.description}>
          {`${sign}$${Number(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} • Processing`}
        </Text>
      );
    }
  };

  const renderIcon = () => {
    if (isWithdrawal) {
      return <WithdrawalSvg />;
    } else {
      return <DepositGreenSvg />;
    }
  };

  const renderOccurrence = () => {
    const type = isWithdrawal ? 'withdrawal' : 'investment';
    return (
      <Text style={styles.occurrences}>{`${capitalizeFirstLetter(
        occurrences,
      )} ${type}`}</Text>
    );
  };

  return (
    <TouchableOpacity onPress={() => handleDetailTransfer(item)}>
      <View style={[styles.container, isLastItem && styles.noBorder]}>
        <View style={styles.icon}>{renderIcon()}</View>
        <View style={styles.textContainer}>
          {renderOccurrence()}
          {description()}
          {selectTransferState(transferState) === 'Processing' && (
            <TouchableOpacity onPress={() => handleCancelTransfer(item)}>
              <Text style={styles.link}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    paddingBottom: 25,
    borderBottomColor: GREEN800,
    borderBottomWidth: 1,
    paddingVertical: 25,
    alignItems: 'flex-start',
    width: Dimensions.get('screen').width - 100,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  occurrences: {
    ...normalText,
    color: BLACK100,
  },
  description: {
    ...smallText,
    color: BLACK200,
    marginTop: 5,
  },
  link: {
    ...smallText,
    color: BLACK200,
    textDecorationLine: 'underline',
    textDecorationColor: BLACK200,
    marginTop: 6,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  icon: {
    marginTop: 3,
  },
});
