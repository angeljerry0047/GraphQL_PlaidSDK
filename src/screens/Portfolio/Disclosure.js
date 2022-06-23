import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { API, graphqlOperation } from 'aws-amplify';

import AppContainer from '../../components/common/AppContainer';
import Title from '../../components/common/Title';
import Bottom from '../../components/common/Bottom';
import Header from '../../components/common/Header';
import Loading from '../../components/common/Loading';
import { BLUE100, WHITE, WHITE_OP80 } from '../../theme/colors';
import { normalBoldText } from '../../theme/fonts';
import { portfolioActions } from '../../actions/portfolio';
import { updateUserInformation } from '../../graphql/mutations';
import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';
import CheckmarkSvg from '../../assets/icons/Checkmark-icon.svg';

const Disclosure = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [docSelected, setDocSelected] = useState(false);
  const [continueSelected, setContinueSelected] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, originalPortfolioAnswers } = useSelector(
    (state) => state.portfolio,
  );
  const { user } = useSelector((state) => state.user);
  const {
    firstName,
    lastName,
    mobileNumber,
    formattedSSN,
    dateOfBirth,
    investmentProfile,
    eachMonthContribution,
    employment,
    socialValues,
    timeHorizon,
    timeHorizonOrg,
    address,
  } = user;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setDocSelected(false);
        setContinueSelected(false);
      };
    }, []),
  );

  const getPayloadForApex = (disclosures) => {
    const streetAddress = [];
    const data = {
      investmentObjective: investmentProfile.investmentObjective,
      annualIncomeUSD: investmentProfile.annualIncomeUSD,
      totalNetWorthUSD: investmentProfile.totalNetWorthUSD,
      totalNetWorthUSDOrg: investmentProfile.totalNetWorthUSDOrg,
      employment: {
        employmentStatus: employment.employmentStatus,
      },
      disclosures,
      identity: {
        name: {
          legalName: `${firstName} ${lastName}`,
          givenName: lastName,
          familyName: firstName,
        },
        dateOfBirth: moment(dateOfBirth, 'MM-DD-YYYY').format('YYYY-MM-DD'),
        socialSecurityNumber: formattedSSN,
      },
      contact: {
        emailAddresses: [user.email],
        phoneNumbers: [
          {
            phoneNumber: mobileNumber,
            phoneNumberType: 'MOBILE',
          },
        ],
        homeAddress: {
          postalCode: address?.postalCode,
          country: 'USA',
          streetAddress: streetAddress.concat(address?.streetAddress),
          state: address?.state,
          city: address?.city,
        },
      },
      eachMonthContribution,
      timeHorizon,
      socialValues,
    };

    if (employment.positionEmployed) {
      data.employment.positionEmployed = employment.positionEmployed;
      data.employment.employer = employment.employer;
    }

    return data;
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = async () => {
    setContinueSelected(true);
    const { shareHolder, politicalOrganization, officialRelatives, brokerage } =
      originalPortfolioAnswers;

    const disclosures = {
      isControlPerson: 'NO',
      isPoliticallyExposed: 'NO',
      isAffiliatedExchangeOrFINRA: 'NO',
    };

    if (shareHolder) {
      const companySymbols = shareHolder
        .replace(/[^a-zA-Z0-9,]/g, '')
        .split(',');
      disclosures.isControlPerson = 'YES';
      disclosures.companySymbols = companySymbols;
    }
    if (politicalOrganization && officialRelatives) {
      const immediateFamily = officialRelatives
        .replace(/[^a-zA-Z,]/g, '')
        .split(',');
      disclosures.politicalExposureDetail = {
        politicalOrganization: politicalOrganization.replace(/[^a-zA-Z]/g, ''),
        immediateFamily,
      };
      disclosures.isPoliticallyExposed = 'YES';
    }
    if (brokerage) {
      disclosures.firmName = brokerage.replace(/[^a-zA-Z0-9,]/g, '').split(',');
      disclosures.isAffiliatedExchangedOrFINRA = 'YES';
    }

    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;

    const payloadToCreateApex = getPayloadForApex(disclosures);
    console.log('Payload to Create Apex: ', payloadToCreateApex);

    const updateUserInformationInput = {
      id: user.id,
      employment,
      investmentProfile,
      politicalExposure: {
        isPoliticallyExposed: disclosures.isPoliticallyExposed,
        immediateFamilyMembers: disclosures?.immediateFamily || '',
        politicalOrganizationName: disclosures?.politicalOrganization || '',
      },
      controlPerson: {
        isControlPerson: disclosures?.isControlPerson || '',
        controlCompanySymbols: disclosures?.companySymbols || '',
      },
      exchangeAffiliation: {
        isAffiliatedExchangeOrFINRA: disclosures?.isAffiliatedExchangeOrFINRA,
      },
      eachMonthContribution,
      socialValues,
      timeHorizon,
      timeHorizonOrg,
    };
    try {
      await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: updateUserInformationInput,
        }),
      );

      dispatch(
        portfolioActions.createApexAccountRequest({
          payload: getPayloadForApex(disclosures),
          token,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenDocument = (val) => {
    setDocSelected(true);
    dispatch(portfolioActions.getAgreementPolicyRequest(val));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon={<ArrowBackSvg />} onPressLeft={goBack} />
      <AppContainer>
        <Title label="Please accept your Stackwell agreements." />
        <View style={styles.section}>
          <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
            <View style={styles.checkbox}>{checked && <CheckmarkSvg />}</View>
          </TouchableWithoutFeedback>
          <Text style={styles.text}>
            I agree to the{' '}
            <TouchableWithoutFeedback
              onPress={() =>
                handleOpenDocument({ url: 'stackwell-documents', doc: 'terms' })
              }>
              <Text style={[styles.text, styles.underline]}>
                Terms of Service,
              </Text>
            </TouchableWithoutFeedback>{' '}
            <TouchableWithoutFeedback
              onPress={() =>
                handleOpenDocument({
                  url: 'stackwell-documents',
                  doc: 'advisory',
                })
              }>
              <Text style={[styles.text, styles.underline]}>
                Advisory Agreement,
              </Text>
            </TouchableWithoutFeedback>{' '}
            <TouchableWithoutFeedback
              onPress={() =>
                handleOpenDocument({
                  url: 'stackwell-documents',
                  doc: 'privacy',
                })
              }>
              <Text style={[styles.text, styles.underline]}>
                Privacy Policy,{' '}
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                handleOpenDocument({
                  url: 'stackwell-documents',
                  doc: 'formCRS',
                })
              }>
              <Text style={[styles.text, styles.underline]}>Form CRS,</Text>
            </TouchableWithoutFeedback>{' '}
            <TouchableWithoutFeedback
              onPress={() =>
                handleOpenDocument({
                  url: 'stackwell-documents',
                  doc: 'ADVPart2A',
                })
              }>
              <Text style={[styles.text, styles.underline]}>ADV Part 2A,</Text>
            </TouchableWithoutFeedback>{' '}
            and the{' '}
            <TouchableWithoutFeedback
              onPress={() =>
                handleOpenDocument({
                  url: 'customer_agreement',
                  doc: 'agreement',
                })
              }>
              <Text style={[styles.text, styles.underline]}>
                Apex Customer Account Agreement and Advisor Authorization.
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
        <Bottom
          label="Continue"
          onPress={handleNextPage}
          isLoading={continueSelected && isLoading}
          isDisabled={!checked}
        />
      </AppContainer>
      {docSelected && isLoading && <Loading backgroundColor="transparent" />}
    </SafeAreaView>
  );
};

export default Disclosure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  section: {
    marginTop: 36,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: BLUE100,
    borderRadius: 10,
    flexDirection: 'row',
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: WHITE_OP80,
    borderWidth: 1,
    marginRight: 17,
    marginTop: 4,
  },
  text: {
    ...normalBoldText,
    lineHeight: 24,
    color: WHITE,
    flex: 1,
    opacity: 0.94,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
