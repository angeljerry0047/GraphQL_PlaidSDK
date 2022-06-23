/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserInformation = /* GraphQL */ `
  query GetUserInformation($id: ID!) {
    getUserInformation(id: $id) {
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
export const listUserInformations = /* GraphQL */ `
  query ListUserInformations(
    $filter: ModelUserInformationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInformations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const userInformationByUserId = /* GraphQL */ `
  query UserInformationByUserId(
    $userId: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserInformationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userInformationByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        closeReason
        errorType
        flaggedAt
        createdAt
        updatedAt
        owner
        appStatus {
          parent
          sub
        }
      }
      nextToken
    }
  }
`;
export const userInformationByEmail = /* GraphQL */ `
  query UserInformationByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserInformationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userInformationByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        closeReason
        errorType
        flaggedAt
        createdAt
        updatedAt
        owner
        appStatus {
          parent
          sub
        }
      }
      nextToken
    }
  }
`;
export const userInformationByErrorTypeByFlaggedAt = /* GraphQL */ `
  query UserInformationByErrorTypeByFlaggedAt(
    $errorType: String
    $flaggedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserInformationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userInformationByErrorTypeByFlaggedAt(
      errorType: $errorType
      flaggedAt: $flaggedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        closeReason
        errorType
        flaggedAt
        createdAt
        updatedAt
        owner
        appStatus {
          parent
          sub
        }
      }
      nextToken
    }
  }
`;
