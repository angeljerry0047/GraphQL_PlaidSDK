import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

import { BLACK100, WHITE, GREEN800, BLUE100 } from '../../../theme/colors';
import { normalText, normalBoldText } from '../../../theme/fonts';
import DepositSvg from '../../../assets/icons/home/deposit-icon.svg';
import WithdrawelSvg from '../../../assets/icons/home/Withdrawel-icon.svg';

const Transfer = ({ navigation, isVisible, hiddenModal }) => {
  const { accounts, updateMode } = useSelector((state) => state.portfolio);
  const handleTransferIn = () => {
    hiddenModal(false);
    if (accounts.length > 0) {
      navigation.navigate('TransferIn', { from: 'transferIn' });
      return;
    }
    if (updateMode) {
      navigation.navigate('TransferReConnectBank', {
        from: 'transferIn',
        where: 'TransferIn',
      });
      return;
    }

    navigation.navigate('TransferConnectBank', {
      from: 'transferIn',
      where: 'TransferIn',
    });
  };

  const handleTransferOut = () => {
    hiddenModal(false);
    if (accounts.length > 0) {
      navigation.navigate('TransferOut', { from: 'transferOut' });
      return;
    }
    if (updateMode) {
      navigation.navigate('TransferReConnectBank', {
        from: 'transferOut',
        where: 'TransferOut',
      });
      return;
    }
    navigation.navigate('TransferConnectBank', {
      from: 'transferOut',
      where: 'TransferOut',
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      transparent={true}
      style={styles.modal}
      backdropColor={BLUE100}
      backdropOpacity={0.25}
      onBackdropPress={() => hiddenModal(false)}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleTransferIn}>
          <View style={styles.item}>
            <Text style={styles.text}>
              Transfer money <Text style={styles.boldText}>into</Text> your
              portfolio
            </Text>
            <DepositSvg />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTransferOut}>
          <View style={styles.item}>
            <Text style={styles.text}>
              Transfer money <Text style={styles.boldText}>out of</Text> your
              portfolio
            </Text>
            <WithdrawelSvg />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => hiddenModal(false)}>
          <View style={styles.bottom}>
            <Text style={styles.text}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    paddingHorizontal: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: GREEN800,
    borderBottomWidth: 1,
    paddingVertical: 25,
  },
  text: {
    ...normalText,
    color: BLACK100,
  },
  boldText: {
    ...normalBoldText,
    color: BLACK100,
  },
  bottom: {
    paddingTop: 25,
    paddingBottom: 50,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
