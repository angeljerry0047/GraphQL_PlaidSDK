import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import InfoPanel from './InfoPanel';
import PortfolioItemBulletInfo from './PortfolioItemBulletInfo';
import { GREEN800, BLUE100 } from '../../theme/colors';
import InfoSvg from '../../assets/icons/portfolio-info-icon.svg';

const SelectedPortfolioItem = (props) => {
  const {
    containerStyle,
    item,
    labelStyle,
    descriptionStyle,
    index,
    dataLength,
  } = props;
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const moreInfoText = useMemo(() => {
    switch (item.label) {
      case 'SPY':
        return 'US Stocks are large U.S.-based corporations with a market capitalization greater than $10BN, which represent a significant portion of the total U.S. equity market and should be the core foundation of your investment portfolio based on how they have historically performed over the long term. These companies tend to be market leaders, generating stable revenue and returns for investors. Additionally, they tend to move with the overall market economy because of their size. They produce innovative solutions often with global market operations, and market news about these companies is typically impactful to the broad market overall.';
      case 'SPDW':
        return 'International stocks are an ownership share in foreign public companies based in developed markets, such as Europe, Australia and Japan. Global diversification can help you manage risk and position your portfolio for long-term growth.';
      case 'SPEM':
        return 'Emerging Market stocks are an ownership share in foreign companies based in newly developing economies like Brazil, Russia, India and China. Emerging Market stocks offer additional diversification because returns on these investments are generally not tied to the performance of US Stocks or International Stocks which can help you manage risk and position your portfolio for long-term growth.';
      case 'USIG':
        return 'Corporate Bonds are debt issued by U.S. corporations with strong credit ratings to fund business activities. These bonds offer lower volatility and a lower yield relative to stocks, but provide downside protection to your portfolio in the event of equity market swings.';
      case 'SCHP':
        return 'Treasury Bonds are debt issued by the U.S. Government and are backed by the full faith and credit of the United States. These bonds offer lower volatility and a lower yield relative to stocks and U.S. Corporate Bonds, but provide downside protection to your portfolio';
      default:
        return '';
    }
  }, [item]);

  return (
    <>
      <View
        style={[
          styles.container,
          containerStyle,
          index !== dataLength - 1 && styles.border,
        ]}>
        <PortfolioItemBulletInfo
          item={item}
          labelStyle={labelStyle}
          descriptionStyle={descriptionStyle}
        />
        <TouchableOpacity
          onPress={() => setInfoModalVisible(true)}
          style={styles.icon}>
          <InfoSvg width={16} height={16} />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isInfoModalVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setInfoModalVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel
          handleDismiss={() => setInfoModalVisible(false)}
          description={moreInfoText}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  border: {
    borderBottomColor: GREEN800,
    borderBottomWidth: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  icon: {
    marginLeft: 8,
    paddingTop: 5,
    paddingBottom: 23,
  },
});

export default SelectedPortfolioItem;
