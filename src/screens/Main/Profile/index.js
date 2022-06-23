import React, { useState, useMemo } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import moment from 'moment';

import AppContainer from '../../../components/common/AppContainer';
import PortfolioComponent from '../../../components/home/Portfolio';
import StickyHeader from '../../../components/common/StickyHeader';
import InfoPanel from '../../../components/profile/InfoPanel';
import ClickableEmailAddress from '../../../components/common/ClickableEmailAddress';
import { userActions } from '../../../actions/user';
import {
  BLACK100,
  WHITE,
  WHITE400,
  GREEN800,
  GREEN400,
  GREEN500,
  BLUE100,
  BLUE200,
} from '../../../theme/colors';
import { normalText, extraLargeText, mediumText } from '../../../theme/fonts';
import ContributionSvg from '../../../assets/icons/home/contribution-icon.svg';
import TransactionSvg from '../../../assets/icons/home/Transaction-history-icon.svg';
import ContactSvg from '../../../assets/icons/home/Trusted-contact-info.svg';
import PersonalSvg from '../../../assets/icons/home/Personal-info-icon.svg';
import BankSvg from '../../../assets/icons/home/Connected-Bank-icon.svg';
import Notifications from '../../../assets/icons/home/Notifications-icon.svg';
import LogoutModal from './LogoutModal';

const Profile = ({ navigation }) => {
  const [position, setPosition] = useState(0);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { apex, accounts, updateMode } = useSelector(
    (state) => state.portfolio,
  );
  const dispatch = useDispatch();

  const checkTime = useMemo(() => {
    const currentTime = moment();
    const createdAtTime = moment(user.createdAt);
    return currentTime.diff(createdAtTime, 'hours', true);
  }, [user]);

  const settings = [
    {
      label1: 'Get help',
      onPress: () => setIsHelpModalVisible(true),
    },
    {
      label1: 'View FAQs',
      onPress: () => navigation.navigate('faqs'),
    },
    {
      label1: 'Change password',
      onPress: () => navigation.navigate('ChangePassword'),
    },
    // {
    //   label1: 'Turn off Face ID',
    // },
    // {
    //   label1: 'Rate Stackwell',
    // },
    // {
    //   label1: 'Send feedback',
    // },
    {
      label1: 'Close account',
      onPress: () => navigation.navigate('CloseAccountOption'),
    },
    {
      label1: 'App version',
      label2: `${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`,
    },
    {
      label1: 'Log out',
      onPress: () => setIsLogoutModalVisible(true),
    },
  ];

  const profileList = [
    {
      label1: 'Personal info',
      icon: <PersonalSvg />,
      onPress: () => navigation.navigate('PersonalInfo'),
    },
    {
      label1: 'Trusted contact',
      icon: <ContactSvg />,
      onPress: () => {
        if (checkTime < 24 || apex?.accountStatus !== 'COMPLETE') {
          navigation.push('WaitingPersonalInfo');
          return;
        }
        if (apex?.owner?.trustedContactflag === false) {
          navigation.navigate('WaitingTrustedContact');
        } else {
          navigation.navigate('TrustedContact');
        }
      },
    },
    {
      label1: 'Monthly contribution',
      icon: <ContributionSvg />,
      onPress: () => navigation.navigate('MonthlyContributionLoading'),
    },
    {
      label1: 'Recent activity',
      icon: <TransactionSvg />,
      onPress: () => navigation.navigate('Activity'),
    },
    // {
    //   label1: 'Investor profile',
    //   icon: <InvestorSvg />,
    // },
    {
      label1: 'Connected bank account',
      icon: <BankSvg />,
      onPress: () => {
        if (accounts[0]?.mask) {
          navigation.navigate('ConnectedBank');
        } else if (updateMode) {
          navigation.navigate('ReConnectBank');
        } else {
          navigation.navigate('BankEmpty');
        }
      },
    },
    {
      label1: 'Notification preferences',
      icon: <Notifications />,
      // onPress: () => navigation.navigate('NotificationPreference'),
    },
  ];

  const others = [
    {
      label1: 'Statements',
      onPress: () => navigation.navigate('Documents'),
    },
    {
      label1: 'Legal documents',
      onPress: () => navigation.navigate('Disclosures'),
    },
  ];

  const handleLogout = () => {
    setIsLogoutModalVisible(false);
    dispatch(userActions.logout());
  };

  const renderHeader = () => {
    if (position > 260) {
      return null;
    }
    return (
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.placeholder}>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </Text>
          </View>
        </View>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <View style={styles.inventorContainer}>
          <Text style={styles.inventorText}>
            Investor since {moment(user?.createdAt).format('YYYY')}
          </Text>
        </View>
      </View>
    );
  };

  const renderStickyHeader = () => {
    if (position < 260) {
      return null;
    }
    return (
      <StickyHeader
        centerIcon={
          <Text style={styles.stickyHeaderText}>Profile and settings</Text>
        }
      />
    );
  };

  const renderItem = () => {
    return (
      <AppContainer flatList style={styles.appContainer}>
        <View style={styles.activityFlatList}>
          <FlatList
            data={profileList}
            renderItem={({ item, index }) => (
              <PortfolioComponent
                item={item}
                isLastItem={index === profileList.length - 1}
              />
            )}
            keyExtractor={(item, index) => `profile${index}`}
            scrollEnabled={false}
            listKey="profile"
          />
        </View>
        <View style={styles.activityFlatList}>
          <FlatList
            data={others}
            renderItem={({ item, index }) => (
              <PortfolioComponent
                item={item}
                isLastItem={index === others.length - 1}
              />
            )}
            keyExtractor={(item, index) => `others${index}`}
            scrollEnabled={false}
            listKey="others"
          />
        </View>
        <View style={styles.activityFlatList}>
          <FlatList
            data={settings}
            renderItem={({ item, index }) => (
              <PortfolioComponent
                item={item}
                isLastItem={index === settings.length - 1}
                isForward={index !== 6 && index !== 7 && index !== 4}
                disabled={index === 4}
              />
            )}
            keyExtractor={(item, index) => `settings${index}`}
            scrollEnabled={false}
            listKey="settings"
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
      <LogoutModal
        isVisible={isLogoutModalVisible}
        setIsVisible={(val) => setIsLogoutModalVisible(val)}
        logout={handleLogout}
      />
      <Modal
        isVisible={isHelpModalVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setIsHelpModalVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel
          handleDismiss={() => setIsHelpModalVisible(false)}
          buttonText="Close">
          Please email our support team at{' '}
          <ClickableEmailAddress emailAddress="support@stackwellcapital.com" />{' '}
          with a description of how we can help. A support specialist will then
          contact you shortly.
        </InfoPanel>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
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
  header: {
    marginTop: 53,
    alignItems: 'center',
  },
  stickyHeaderText: {
    ...normalText,
    color: BLACK100,
  },
  avatarContainer: {
    borderColor: GREEN400,
    borderWidth: 1.5,
    width: 106,
    height: 106,
    padding: 3,
    borderRadius: 100,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: BLUE200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    ...extraLargeText,
    color: GREEN500,
    fontWeight: '500',
  },
  name: {
    ...extraLargeText,
    color: BLACK100,
    marginBottom: 13,
  },
  inventorContainer: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: BLUE200,
    borderColor: BLUE200,
    borderWidth: 1,
    marginBottom: 25,
  },
  inventorText: {
    color: WHITE,
    ...mediumText,
    fontWeight: '600',
    opacity: 0.94,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
