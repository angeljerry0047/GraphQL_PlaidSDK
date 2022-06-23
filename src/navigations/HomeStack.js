import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import HomeScreen from '../screens/Main/Home';
import PortfolioValue from '../screens/Main/Home/PortfolioValue';
import PortfolioScreen from '../screens/Main/Portfolio';
import OtherPortfolioScreen from '../screens/Main/Portfolio/OtherPortfolio';
import ChangeReview from '../screens/Main/Portfolio/Review';
import ChangeConfirm from '../screens/Main/Portfolio/Confirm';
import FundDetail from '../screens/Main/Portfolio/FundDetail';
import ProfileScreen from '../screens/Main/Profile';
import Address from '../screens/Main/Profile/Address';
import MobileNum from '../screens/Main/Profile/MobileNum';
import PhoneVerification from '../screens/Main/Profile/PhoneVerification';
import VerificationSuccess from '../screens/Main/Profile/VerificationSuccess';
import PersonalInfo from '../screens/Main/Profile/PersonalInfo';
import TrustedContact from '../screens/Main/Profile/TrustedContact';
import TrustedEmail from '../screens/Main/Profile/TrustedEmail';
import TrustedMobileNum from '../screens/Main/Profile/TrustedMobileNum';
import TrustedAddress from '../screens/Main/Profile/TrustedAddress';
import NotificationPreference from '../screens/Main/Profile/NotificationPreference';
import Transfer from '../screens/Main/Transfer';
import TransferConnectBank from '../screens/Main/Transfer/TransferConnectBank';
import TransferReConnectBank from '../screens/Main/Transfer/ReConnectBank';
import TransferFunds from '../screens/Main/Transfer/TransferFunds';
import TransferAmount from '../screens/Main/Transfer/TransferAmount';
import TransferReview from '../screens/Main/Transfer/TransferReview';
import TransferConfirm from '../screens/Main/Transfer/TransferConfirm';
import TransferProcessing from '../screens/Main/Transfer/Processing';
import Activity from '../screens/Main/Transactions/Activity';
import TransactionDetail from '../screens/Main/Transactions/TransactionDetail';
import TransactionCancel from '../screens/Main/Transactions/TransactionCancel';
import TransactionCancelSuccess from '../screens/Main/Transactions/CancelConfirm';
import Documents from '../screens/Main/Profile/Documents';
import DocumentStatement from '../screens/Main/Profile/Documents/DocumentStatement';
import Document from '../screens/Main/Profile/Documents/Document';
import Disclosures from '../screens/Main/Profile/Disclosures';
import WaitingTrustedContact from '../screens/Main/Profile/WaitingTrustedContact';
import WaitingPersonalInfo from '../screens/Main/Profile/WaitingPersonalInfo';
import ConnectedBank from '../screens/Main/Profile/ConnectedBank';
import RemovePrompt from '../screens/Main/Profile/ConnectedBank/RemovePrompt';
import RemoveBankConfirm from '../screens/Main/Profile/ConnectedBank/RemovedConfirm';
import ChangeBankConfirm from '../screens/Main/Profile/ConnectedBank/ChangedConfirm';
import BankEmpty from '../screens/Main/Profile/ConnectedBank/BankEmpty';
import ReConnectBank from '../screens/Main/Profile/ConnectedBank/ReConnectBank';
import TrustedContactSuccess from '../screens/Main/Profile/TrustedContactSuccess';
import ContentfulArticle from '../screens/Main/Contentful/Article';
import CloseAccountOption from '../screens/Main/Profile/CloseAccount/CloseOption';
import CloseAccountConfirm from '../screens/Main/Profile/CloseAccount/CloseConfirm';
import OtherReason from '../screens/Main/Profile/CloseAccount/OtherReason';
import FAQs from '../screens/Main/Profile/FAQs';
import ChangePassword from '../screens/Main/Profile/ChangePassword';
import ResetSuccess from '../screens/Main/Profile/ResetSuccess';
import MonthlyContributionLoading from '../screens/Main/MonthlyContributions/PreviewLoading';
import MonthlyContributions from '../screens/Main/MonthlyContributions';
import ContributionEditConfirm from '../screens/Main/MonthlyContributions/ContributionEditConfirm';
import ContributionStopConfirm from '../screens/Main/MonthlyContributions/ContributionStopConfirm';
import ContributionStartConfirm from '../screens/Main/MonthlyContributions/ContributionStartConfirm';
import EditContributionReview from '../screens/Main/MonthlyContributions/EditContributionReview';
import EditMonthlyContribution from '../screens/Main/MonthlyContributions/EditMonthlyContribution';
import StartContributionReview from '../screens/Main/MonthlyContributions/StartContributionReview';
import ConnectBank from '../screens/Main/MonthlyContributions/ConnectBank';
import StopContribution from '../screens/Main/MonthlyContributions/StopContribution';
import MonthlyContributionEmpty from '../screens/Main/MonthlyContributions/MonthlyContributionEmpty';
import MonthlyContributionBlock from '../screens/Main/MonthlyContributions/ContributionBlock';

import AgreementDocuments from '../screens/Portfolio/AgreementDocuments';

import { WHITE200 } from '../theme/colors';
import HomeSvg from '../assets/icons/home/home-icon.svg';
import HomeActiveSvg from '../assets/icons/home/home-activity-icon.svg';
import AccountSvg from '../assets/icons/home/account-icon.svg';
import AccountActiveSvg from '../assets/icons/home/account-activity-icon.svg';
import PortfolioSvg from '../assets/icons/home/portfolio-icon.svg';
import PortfolioActiveSvg from '../assets/icons/home/portfolio-activity-icon.svg';
import TransferSvg from '../assets/icons/home/transfer-icon.svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ModalBackground = () => {
  return null;
};

const AppTabsScreen = ({ navigation }) => {
  const [isVisible, setVisible] = useState(false);
  const { apex } = useSelector((state) => state.portfolio);

  return (
    <>
      <Tab.Navigator
        initialRouteName="TransferHome"
        tabBarOptions={{
          showLabel: false,
          tabBarShowLabel: false,
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            borderTopColor: WHITE200,
            borderTopWidth: 1,
            paddingBottom: 25,
            height: 69,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? <HomeActiveSvg /> : <HomeSvg />,
          }}
        />
        <Tab.Screen
          name="HomePortfolio"
          component={PortfolioScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? <PortfolioActiveSvg /> : <PortfolioSvg />,
          }}
        />
        <Tab.Screen
          name="HomeTransfer"
          component={
            apex?.accountStatus === 'COMPLETE'
              ? ModalBackground
              : TransferProcessing
          }
          options={{
            tabBarIcon: () => <TransferSvg />,
          }}
          listeners={() => ({
            tabPress: (e) => {
              if (apex?.accountStatus === 'COMPLETE') {
                e.preventDefault();
                setVisible(true);
              }
            },
          })}
        />
        <Tab.Screen
          name="ProfileSetting"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? <AccountActiveSvg /> : <AccountSvg />,
          }}
        />
      </Tab.Navigator>
      <Transfer
        isVisible={isVisible}
        hiddenModal={() => setVisible(false)}
        navigation={navigation}
      />
    </>
  );
};

const HomeStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="TransferHome" component={AppTabsScreen} />
      <Stack.Screen
        name="TransferConnectBank"
        component={TransferConnectBank}
      />
      <Stack.Screen
        name="TransferReConnectBank"
        component={TransferReConnectBank}
      />
      <Stack.Screen name="TransferIn" component={TransferFunds} />
      <Stack.Screen name="TransferOut" component={TransferFunds} />
      <Stack.Screen name="TransferAmount" component={TransferAmount} />
      <Stack.Screen name="TransferReview" component={TransferReview} />
      <Stack.Screen name="TransferConfirm" component={TransferConfirm} />
      <Stack.Screen name="OtherPortfolio" component={OtherPortfolioScreen} />
      <Stack.Screen name="ChangeReview" component={ChangeReview} />
      <Stack.Screen name="ChangeConfirm" component={ChangeConfirm} />
      <Stack.Screen name="FundDetail" component={FundDetail} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="ConnectedBank" component={ConnectedBank} />
      <Stack.Screen name="RemovePrompt" component={RemovePrompt} />
      <Stack.Screen name="RemoveBankConfirm" component={RemoveBankConfirm} />
      <Stack.Screen name="ChangeBankConfirm" component={ChangeBankConfirm} />
      <Stack.Screen name="BankEmpty" component={BankEmpty} />
      <Stack.Screen name="ReConnectBank" component={ReConnectBank} />
      <Stack.Screen
        name="NotificationPreference"
        component={NotificationPreference}
      />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
      <Stack.Screen name="TransactionCancel" component={TransactionCancel} />
      <Stack.Screen name="TransferProcessing" component={TransferProcessing} />
      <Stack.Screen
        name="TransactionCancelSuccess"
        component={TransactionCancelSuccess}
      />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="MobileNum" component={MobileNum} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      <Stack.Screen
        name="VerificationSuccess"
        component={VerificationSuccess}
      />
      <Stack.Screen name="TrustedContact" component={TrustedContact} />
      <Stack.Screen name="TrustedEmail" component={TrustedEmail} />
      <Stack.Screen name="TrustedMobileNum" component={TrustedMobileNum} />
      <Stack.Screen name="TrustedAddress" component={TrustedAddress} />
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen name="DocumentStatement" component={DocumentStatement} />
      <Stack.Screen name="Document" component={Document} />
      <Stack.Screen name="Disclosures" component={Disclosures} />
      <Stack.Screen name="PortfolioValue" component={PortfolioValue} />
      <Stack.Screen
        name="WaitingTrustedContact"
        component={WaitingTrustedContact}
      />
      <Stack.Screen
        name="WaitingPersonalInfo"
        component={WaitingPersonalInfo}
      />
      <Stack.Screen
        name="TrustedContactSuccess"
        component={TrustedContactSuccess}
      />
      <Stack.Screen name="ContentfulArticle" component={ContentfulArticle} />
      <Stack.Screen name="CloseAccountOption" component={CloseAccountOption} />
      <Stack.Screen
        name="CloseAccountConfirm"
        component={CloseAccountConfirm}
      />
      <Stack.Screen name="OtherReason" component={OtherReason} />
      <Stack.Screen name="AgreementDocuments" component={AgreementDocuments} />
      <Stack.Screen
        name="MonthlyContributionLoading"
        component={MonthlyContributionLoading}
      />
      <Stack.Screen
        name="MonthlyContributions"
        component={MonthlyContributions}
      />
      <Stack.Screen
        name="EditMonthlyContribution"
        component={EditMonthlyContribution}
      />
      <Stack.Screen
        name="EditContributionReview"
        component={EditContributionReview}
      />
      <Stack.Screen
        name="ContributionEditConfirm"
        component={ContributionEditConfirm}
      />
      <Stack.Screen
        name="MonthlyContributionEmpty"
        component={MonthlyContributionEmpty}
      />
      <Stack.Screen
        name="StartContributionReview"
        component={StartContributionReview}
      />
      <Stack.Screen name="ConnectBank" component={ConnectBank} />
      <Stack.Screen
        name="ContributionStartConfirm"
        component={ContributionStartConfirm}
      />
      <Stack.Screen name="StopContribution" component={StopContribution} />
      <Stack.Screen
        name="ContributionStopConfirm"
        component={ContributionStopConfirm}
      />
      <Stack.Screen
        name="MonthlyContributionBlock"
        component={MonthlyContributionBlock}
      />
      <Stack.Screen name="faqs" component={FAQs} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ResetSuccess" component={ResetSuccess} />
    </Stack.Navigator>
  );
};

export default HomeStacks;
