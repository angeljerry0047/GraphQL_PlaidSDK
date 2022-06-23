import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Congration from '../screens/Portfolio/Congration';
import Historical from '../screens/Portfolio/Historical';
import Explain from '../screens/Portfolio/Explain';
import InvestGoals from '../screens/Portfolio/InvestGoals';
import InvestmentSoon from '../screens/Portfolio/InvestmentSoon';
import ImportantSocialValues from '../screens/Portfolio/ImportantSocialValues';
import EmploymentStatus from '../screens/Portfolio/EmploymentStatus';
import ExtraEmploymentInfo from '../screens/Portfolio/ExtraEmploymentInfo';
import AnnualIncome from '../screens/Portfolio/AnnualIncome';
import EstimatedNetWorth from '../screens/Portfolio/EstimatedNetWorth';
import EachMonthContribute from '../screens/Portfolio/EachMonthContribute';
import StockInquiries from '../screens/Portfolio/StockInquiries';
import RejectView from '../screens/Portfolio/Reject';
import Disclosure from '../screens/Portfolio/Disclosure';
import AgreementPolicy from '../screens/Portfolio/AgreementPolicy';
import AgreementDocuments from '../screens/Portfolio/AgreementDocuments';
import PortfolioAnalyzing from '../screens/Portfolio/PortfolioAnalyzing';
import SelectedPortfolio from '../screens/Portfolio/SelectedPortfolio';
import OtherPortfolio from '../screens/Portfolio/OtherPortfolio';
import Contribution from '../screens/Portfolio/Contribution';
import MonthlyContribution from '../screens/Portfolio/MonthlyContribution';
import BankFee from '../screens/Portfolio/BankFee';
import ConnectBank from '../screens/Portfolio/ConnectBank';
import ConfirmSchedule from '../screens/Portfolio/ConfirmSchedule';
import TransferConfirm from '../screens/Portfolio/TransferConfirm';

const PortfolioStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="Congration">
      <Stack.Screen name="Congration" component={Congration} />
      <Stack.Screen name="Historical" component={Historical} />
      <Stack.Screen name="Explain" component={Explain} />
      <Stack.Screen name="InvestGoals" component={InvestGoals} />
      <Stack.Screen name="InvestmentSoon" component={InvestmentSoon} />
      <Stack.Screen
        name="ImportantSocialValues"
        component={ImportantSocialValues}
      />
      <Stack.Screen name="EmploymentStatus" component={EmploymentStatus} />
      <Stack.Screen
        name="ExtraEmploymentInfo"
        component={ExtraEmploymentInfo}
      />
      <Stack.Screen name="AnnualIncome" component={AnnualIncome} />
      <Stack.Screen name="EstimatedNetWorth" component={EstimatedNetWorth} />
      <Stack.Screen
        name="EachMonthContribute"
        component={EachMonthContribute}
      />
      <Stack.Screen name="StockInquiries" component={StockInquiries} />
      <Stack.Screen name="Reject" component={RejectView} />
      <Stack.Screen name="Disclosure" component={Disclosure} />
      <Stack.Screen name="AgreementPolicy" component={AgreementPolicy} />
      <Stack.Screen name="AgreementDocuments" component={AgreementDocuments} />
      <Stack.Screen name="PortfolioAnalyzing" component={PortfolioAnalyzing} />
      <Stack.Screen name="SelectedPortfolio" component={SelectedPortfolio} />
      <Stack.Screen name="Others" component={OtherPortfolio} />
      <Stack.Screen name="Contribution" component={Contribution} />
      <Stack.Screen
        name="MonthlyContribution"
        component={MonthlyContribution}
      />
      <Stack.Screen name="BankFee" component={BankFee} />
      <Stack.Screen name="ConnectBank" component={ConnectBank} />
      <Stack.Screen name="ConfirmSchedule" component={ConfirmSchedule} />
      <Stack.Screen name="TransferConfirm" component={TransferConfirm} />
    </Stack.Navigator>
  );
};

export default PortfolioStacks;
