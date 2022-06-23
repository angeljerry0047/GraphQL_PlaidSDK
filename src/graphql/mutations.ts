/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserInformation = /* GraphQL */ `
  mutation CreateUserInformation(
    $input: CreateUserInformationInput!
    $condition: ModelUserInformationConditionInput
  ) {
    createUserInformation(input: $input, condition: $condition) {
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
export const updateUserInformation = /* GraphQL */ `
  mutation UpdateUserInformation(
    $input: UpdateUserInformationInput!
    $condition: ModelUserInformationConditionInput
  ) {
    updateUserInformation(input: $input, condition: $condition) {
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
