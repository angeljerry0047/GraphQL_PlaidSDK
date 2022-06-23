/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserInformation = /* GraphQL */ `
  subscription OnCreateUserInformation($owner: String) {
    onCreateUserInformation(owner: $owner) {
      id
      userId
      email
      lastFourSSN
      firstName
      lastName
      dateOfBirth
      mobileNumber
      usCitizen
      address {
        streetAddress
        city
        state
        postalCode
        country
      }
      phone {
        phoneNumber
        phoneNumberType
      }
      eachMonthContribution
      monthlyContribution
      socialValues
      timeHorizon
      timeHorizonOrg
      controlPerson {
        isControlPerson
        controlCompanySymbols
      }
      politicalExposure {
        isPoliticallyExposed
        immediateFamilyMembers
        politicalOrganizationName
      }
      exchangeAffiliation {
        isAffiliatedExchangeOrFINRA
        affiliatedApproval
        firmName
      }
      employment {
        employmentStatus
        employer
        positionEmployed
      }
      investmentProfile {
        investmentObjective
        investmentExperience
        annualIncomeUSD {
          min
          max
        }
        liquidWorthUSD
        totalNetWorthUSD {
          min
          max
        }
        totalNetWorthUSDOrg
        riskTolerance
        federalTaxBracketPercentage
      }
      catReporting {
        catAccountholderType
      }
      applicationSignature {
        eSigned
        imageSource
        snapImageSource
        snapImageReference
        snapImagePhotoIdReference
      }
      createdAt
      updatedAt
      owner
      appStatus {
        parent
        sub
      }
    }
  }
`;
export const onUpdateUserInformation = /* GraphQL */ `
  subscription OnUpdateUserInformation($owner: String) {
    onUpdateUserInformation(owner: $owner) {
      id
      userId
      email
      lastFourSSN
      firstName
      lastName
      dateOfBirth
      mobileNumber
      usCitizen
      address {
        streetAddress
        city
        state
        postalCode
        country
      }
      phone {
        phoneNumber
        phoneNumberType
      }
      eachMonthContribution
      monthlyContribution
      socialValues
      timeHorizon
      timeHorizonOrg
      controlPerson {
        isControlPerson
        controlCompanySymbols
      }
      politicalExposure {
        isPoliticallyExposed
        immediateFamilyMembers
        politicalOrganizationName
      }
      exchangeAffiliation {
        isAffiliatedExchangeOrFINRA
        affiliatedApproval
        firmName
      }
      employment {
        employmentStatus
        employer
        positionEmployed
      }
      investmentProfile {
        investmentObjective
        investmentExperience
        annualIncomeUSD {
          min
          max
        }
        liquidWorthUSD
        totalNetWorthUSD {
          min
          max
        }
        totalNetWorthUSDOrg
        riskTolerance
        federalTaxBracketPercentage
      }
      catReporting {
        catAccountholderType
      }
      applicationSignature {
        eSigned
        imageSource
        snapImageSource
        snapImageReference
        snapImagePhotoIdReference
      }
      createdAt
      updatedAt
      owner
      appStatus {
        parent
        sub
      }
    }
  }
`;
