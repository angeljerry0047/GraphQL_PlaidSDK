/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInformationInput = {
  id?: string | null,
  userId: string,
  email: string,
  lastFourSSN: string,
  firstName?: string | null,
  lastName?: string | null,
  dateOfBirth?: string | null,
  mobileNumber?: string | null,
  usCitizen?: boolean | null,
  address?: AddressInput | null,
  phone?: PhoneNumberInput | null,
  eachMonthContribution?: number | null,
  monthlyContribution?: number | null,
  socialValues?: Array< string | null > | null,
  timeHorizon?: string | null,
  timeHorizonOrg?: string | null,
  controlPerson?: ControlPersonInput | null,
  politicalExposure?: PoliticalExposureInput | null,
  exchangeAffiliation?: ExchangeAffiliationInput | null,
  employment?: EmploymentInput | null,
  investmentProfile?: InvestmentProfileInput | null,
  catReporting?: CatReportingInput | null,
  applicationSignature?: ApplicationSignatureInput | null,
  closeReason?: string | null,
  errorType?: string | null,
  flaggedAt?: string | null,
};

export type AddressInput = {
  streetAddress?: string | null,
  city?: string | null,
  state?: string | null,
  postalCode?: string | null,
  country?: string | null,
};

export type PhoneNumberInput = {
  phoneNumber?: string | null,
  phoneNumberType?: string | null,
};

export type ControlPersonInput = {
  isControlPerson?: string | null,
  controlCompanySymbols?: Array< string | null > | null,
};

export type PoliticalExposureInput = {
  isPoliticallyExposed?: string | null,
  immediateFamilyMembers?: Array< string | null > | null,
  politicalOrganizationName?: string | null,
};

export type ExchangeAffiliationInput = {
  isAffiliatedExchangeOrFINRA?: string | null,
  affiliatedApproval?: Array< string | null > | null,
  firmName?: string | null,
};

export type EmploymentInput = {
  employmentStatus?: string | null,
  employer?: string | null,
  positionEmployed?: string | null,
};

export type InvestmentProfileInput = {
  investmentObjective?: string | null,
  investmentExperience?: string | null,
  annualIncomeUSD?: CustomRangeInput | null,
  liquidWorthUSD?: string | null,
  totalNetWorthUSD?: CustomRangeInput | null,
  totalNetWorthUSDOrg?: string | null,
  riskTolerance?: string | null,
  federalTaxBracketPercentage?: number | null,
};

export type CustomRangeInput = {
  min?: number | null,
  max?: number | null,
};

export type CatReportingInput = {
  catAccountholderType?: string | null,
};

export type ApplicationSignatureInput = {
  eSigned?: boolean | null,
  imageSource?: string | null,
  snapImageSource?: string | null,
  snapImageReference?: string | null,
  snapImagePhotoIdReference?: string | null,
};

export type ModelUserInformationConditionInput = {
  userId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  lastFourSSN?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  dateOfBirth?: ModelStringInput | null,
  mobileNumber?: ModelStringInput | null,
  usCitizen?: ModelBooleanInput | null,
  eachMonthContribution?: ModelIntInput | null,
  monthlyContribution?: ModelIntInput | null,
  socialValues?: ModelStringInput | null,
  timeHorizon?: ModelStringInput | null,
  timeHorizonOrg?: ModelStringInput | null,
  closeReason?: ModelStringInput | null,
  errorType?: ModelStringInput | null,
  flaggedAt?: ModelStringInput | null,
  and?: Array< ModelUserInformationConditionInput | null > | null,
  or?: Array< ModelUserInformationConditionInput | null > | null,
  not?: ModelUserInformationConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UserInformation = {
  __typename: "UserInformation",
  id: string,
  userId: string,
  email: string,
  lastFourSSN: string,
  firstName?: string | null,
  lastName?: string | null,
  dateOfBirth?: string | null,
  mobileNumber?: string | null,
  usCitizen?: boolean | null,
  address?: Address | null,
  phone?: PhoneNumber | null,
  eachMonthContribution?: number | null,
  monthlyContribution?: number | null,
  socialValues?: Array< string | null > | null,
  timeHorizon?: string | null,
  timeHorizonOrg?: string | null,
  controlPerson?: ControlPerson | null,
  politicalExposure?: PoliticalExposure | null,
  exchangeAffiliation?: ExchangeAffiliation | null,
  employment?: Employment | null,
  investmentProfile?: InvestmentProfile | null,
  catReporting?: CatReporting | null,
  applicationSignature?: ApplicationSignature | null,
  closeReason?: string | null,
  errorType?: string | null,
  flaggedAt?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Address = {
  __typename: "Address",
  streetAddress?: string | null,
  city?: string | null,
  state?: string | null,
  postalCode?: string | null,
  country?: string | null,
};

export type PhoneNumber = {
  __typename: "PhoneNumber",
  phoneNumber?: string | null,
  phoneNumberType?: string | null,
};

export type ControlPerson = {
  __typename: "ControlPerson",
  isControlPerson?: string | null,
  controlCompanySymbols?: Array< string | null > | null,
};

export type PoliticalExposure = {
  __typename: "PoliticalExposure",
  isPoliticallyExposed?: string | null,
  immediateFamilyMembers?: Array< string | null > | null,
  politicalOrganizationName?: string | null,
};

export type ExchangeAffiliation = {
  __typename: "ExchangeAffiliation",
  isAffiliatedExchangeOrFINRA?: string | null,
  affiliatedApproval?: Array< string | null > | null,
  firmName?: string | null,
};

export type Employment = {
  __typename: "Employment",
  employmentStatus?: string | null,
  employer?: string | null,
  positionEmployed?: string | null,
};

export type InvestmentProfile = {
  __typename: "InvestmentProfile",
  investmentObjective?: string | null,
  investmentExperience?: string | null,
  annualIncomeUSD?: CustomRange | null,
  liquidWorthUSD?: string | null,
  totalNetWorthUSD?: CustomRange | null,
  totalNetWorthUSDOrg?: string | null,
  riskTolerance?: string | null,
  federalTaxBracketPercentage?: number | null,
};

export type CustomRange = {
  __typename: "CustomRange",
  min?: number | null,
  max?: number | null,
};

export type CatReporting = {
  __typename: "CatReporting",
  catAccountholderType?: string | null,
};

export type ApplicationSignature = {
  __typename: "ApplicationSignature",
  eSigned?: boolean | null,
  imageSource?: string | null,
  snapImageSource?: string | null,
  snapImageReference?: string | null,
  snapImagePhotoIdReference?: string | null,
};

export type UpdateUserInformationInput = {
  id: string,
  userId?: string | null,
  email?: string | null,
  lastFourSSN?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  dateOfBirth?: string | null,
  mobileNumber?: string | null,
  usCitizen?: boolean | null,
  address?: AddressInput | null,
  phone?: PhoneNumberInput | null,
  eachMonthContribution?: number | null,
  monthlyContribution?: number | null,
  socialValues?: Array< string | null > | null,
  timeHorizon?: string | null,
  timeHorizonOrg?: string | null,
  controlPerson?: ControlPersonInput | null,
  politicalExposure?: PoliticalExposureInput | null,
  exchangeAffiliation?: ExchangeAffiliationInput | null,
  employment?: EmploymentInput | null,
  investmentProfile?: InvestmentProfileInput | null,
  catReporting?: CatReportingInput | null,
  applicationSignature?: ApplicationSignatureInput | null,
  closeReason?: string | null,
  errorType?: string | null,
  flaggedAt?: string | null,
};

export type ModelUserInformationFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  lastFourSSN?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  dateOfBirth?: ModelStringInput | null,
  mobileNumber?: ModelStringInput | null,
  usCitizen?: ModelBooleanInput | null,
  eachMonthContribution?: ModelIntInput | null,
  monthlyContribution?: ModelIntInput | null,
  socialValues?: ModelStringInput | null,
  timeHorizon?: ModelStringInput | null,
  timeHorizonOrg?: ModelStringInput | null,
  closeReason?: ModelStringInput | null,
  errorType?: ModelStringInput | null,
  flaggedAt?: ModelStringInput | null,
  and?: Array< ModelUserInformationFilterInput | null > | null,
  or?: Array< ModelUserInformationFilterInput | null > | null,
  not?: ModelUserInformationFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelUserInformationConnection = {
  __typename: "ModelUserInformationConnection",
  items:  Array<UserInformation >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateUserInformationMutationVariables = {
  input: CreateUserInformationInput,
  condition?: ModelUserInformationConditionInput | null,
};

export type CreateUserInformationMutation = {
  createUserInformation?:  {
    __typename: "UserInformation",
    id: string,
    userId: string,
    email: string,
    lastFourSSN: string,
    firstName?: string | null,
    lastName?: string | null,
    dateOfBirth?: string | null,
    mobileNumber?: string | null,
    usCitizen?: boolean | null,
    address?:  {
      __typename: "Address",
      streetAddress?: string | null,
      city?: string | null,
      state?: string | null,
      postalCode?: string | null,
      country?: string | null,
    } | null,
    phone?:  {
      __typename: "PhoneNumber",
      phoneNumber?: string | null,
      phoneNumberType?: string | null,
    } | null,
    eachMonthContribution?: number | null,
    monthlyContribution?: number | null,
    socialValues?: Array< string | null > | null,
    timeHorizon?: string | null,
    timeHorizonOrg?: string | null,
    controlPerson?:  {
      __typename: "ControlPerson",
      isControlPerson?: string | null,
      controlCompanySymbols?: Array< string | null > | null,
    } | null,
    politicalExposure?:  {
      __typename: "PoliticalExposure",
      isPoliticallyExposed?: string | null,
      immediateFamilyMembers?: Array< string | null > | null,
      politicalOrganizationName?: string | null,
    } | null,
    exchangeAffiliation?:  {
      __typename: "ExchangeAffiliation",
      isAffiliatedExchangeOrFINRA?: string | null,
      affiliatedApproval?: Array< string | null > | null,
      firmName?: string | null,
    } | null,
    employment?:  {
      __typename: "Employment",
      employmentStatus?: string | null,
      employer?: string | null,
      positionEmployed?: string | null,
    } | null,
    investmentProfile?:  {
      __typename: "InvestmentProfile",
      investmentObjective?: string | null,
      investmentExperience?: string | null,
      annualIncomeUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      liquidWorthUSD?: string | null,
      totalNetWorthUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      totalNetWorthUSDOrg?: string | null,
      riskTolerance?: string | null,
      federalTaxBracketPercentage?: number | null,
    } | null,
    catReporting?:  {
      __typename: "CatReporting",
      catAccountholderType?: string | null,
    } | null,
    applicationSignature?:  {
      __typename: "ApplicationSignature",
      eSigned?: boolean | null,
      imageSource?: string | null,
      snapImageSource?: string | null,
      snapImageReference?: string | null,
      snapImagePhotoIdReference?: string | null,
    } | null,
    closeReason?: string | null,
    errorType?: string | null,
    flaggedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserInformationMutationVariables = {
  input: UpdateUserInformationInput,
  condition?: ModelUserInformationConditionInput | null,
};

export type UpdateUserInformationMutation = {
  updateUserInformation?:  {
    __typename: "UserInformation",
    id: string,
    userId: string,
    email: string,
    lastFourSSN: string,
    firstName?: string | null,
    lastName?: string | null,
    dateOfBirth?: string | null,
    mobileNumber?: string | null,
    usCitizen?: boolean | null,
    address?:  {
      __typename: "Address",
      streetAddress?: string | null,
      city?: string | null,
      state?: string | null,
      postalCode?: string | null,
      country?: string | null,
    } | null,
    phone?:  {
      __typename: "PhoneNumber",
      phoneNumber?: string | null,
      phoneNumberType?: string | null,
    } | null,
    eachMonthContribution?: number | null,
    monthlyContribution?: number | null,
    socialValues?: Array< string | null > | null,
    timeHorizon?: string | null,
    timeHorizonOrg?: string | null,
    controlPerson?:  {
      __typename: "ControlPerson",
      isControlPerson?: string | null,
      controlCompanySymbols?: Array< string | null > | null,
    } | null,
    politicalExposure?:  {
      __typename: "PoliticalExposure",
      isPoliticallyExposed?: string | null,
      immediateFamilyMembers?: Array< string | null > | null,
      politicalOrganizationName?: string | null,
    } | null,
    exchangeAffiliation?:  {
      __typename: "ExchangeAffiliation",
      isAffiliatedExchangeOrFINRA?: string | null,
      affiliatedApproval?: Array< string | null > | null,
      firmName?: string | null,
    } | null,
    employment?:  {
      __typename: "Employment",
      employmentStatus?: string | null,
      employer?: string | null,
      positionEmployed?: string | null,
    } | null,
    investmentProfile?:  {
      __typename: "InvestmentProfile",
      investmentObjective?: string | null,
      investmentExperience?: string | null,
      annualIncomeUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      liquidWorthUSD?: string | null,
      totalNetWorthUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      totalNetWorthUSDOrg?: string | null,
      riskTolerance?: string | null,
      federalTaxBracketPercentage?: number | null,
    } | null,
    catReporting?:  {
      __typename: "CatReporting",
      catAccountholderType?: string | null,
    } | null,
    applicationSignature?:  {
      __typename: "ApplicationSignature",
      eSigned?: boolean | null,
      imageSource?: string | null,
      snapImageSource?: string | null,
      snapImageReference?: string | null,
      snapImagePhotoIdReference?: string | null,
    } | null,
    closeReason?: string | null,
    errorType?: string | null,
    flaggedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserInformationQueryVariables = {
  id: string,
};

export type GetUserInformationQuery = {
  getUserInformation?:  {
    __typename: "UserInformation",
    id: string,
    userId: string,
    email: string,
    lastFourSSN: string,
    firstName?: string | null,
    lastName?: string | null,
    dateOfBirth?: string | null,
    mobileNumber?: string | null,
    usCitizen?: boolean | null,
    address?:  {
      __typename: "Address",
      streetAddress?: string | null,
      city?: string | null,
      state?: string | null,
      postalCode?: string | null,
      country?: string | null,
    } | null,
    phone?:  {
      __typename: "PhoneNumber",
      phoneNumber?: string | null,
      phoneNumberType?: string | null,
    } | null,
    eachMonthContribution?: number | null,
    monthlyContribution?: number | null,
    socialValues?: Array< string | null > | null,
    timeHorizon?: string | null,
    timeHorizonOrg?: string | null,
    controlPerson?:  {
      __typename: "ControlPerson",
      isControlPerson?: string | null,
      controlCompanySymbols?: Array< string | null > | null,
    } | null,
    politicalExposure?:  {
      __typename: "PoliticalExposure",
      isPoliticallyExposed?: string | null,
      immediateFamilyMembers?: Array< string | null > | null,
      politicalOrganizationName?: string | null,
    } | null,
    exchangeAffiliation?:  {
      __typename: "ExchangeAffiliation",
      isAffiliatedExchangeOrFINRA?: string | null,
      affiliatedApproval?: Array< string | null > | null,
      firmName?: string | null,
    } | null,
    employment?:  {
      __typename: "Employment",
      employmentStatus?: string | null,
      employer?: string | null,
      positionEmployed?: string | null,
    } | null,
    investmentProfile?:  {
      __typename: "InvestmentProfile",
      investmentObjective?: string | null,
      investmentExperience?: string | null,
      annualIncomeUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      liquidWorthUSD?: string | null,
      totalNetWorthUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      totalNetWorthUSDOrg?: string | null,
      riskTolerance?: string | null,
      federalTaxBracketPercentage?: number | null,
    } | null,
    catReporting?:  {
      __typename: "CatReporting",
      catAccountholderType?: string | null,
    } | null,
    applicationSignature?:  {
      __typename: "ApplicationSignature",
      eSigned?: boolean | null,
      imageSource?: string | null,
      snapImageSource?: string | null,
      snapImageReference?: string | null,
      snapImagePhotoIdReference?: string | null,
    } | null,
    closeReason?: string | null,
    errorType?: string | null,
    flaggedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUserInformationsQueryVariables = {
  filter?: ModelUserInformationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserInformationsQuery = {
  listUserInformations?:  {
    __typename: "ModelUserInformationConnection",
    items:  Array< {
      __typename: "UserInformation",
      id: string,
      userId: string,
      email: string,
      lastFourSSN: string,
      firstName?: string | null,
      lastName?: string | null,
      dateOfBirth?: string | null,
      mobileNumber?: string | null,
      usCitizen?: boolean | null,
      address?:  {
        __typename: "Address",
        streetAddress?: string | null,
        city?: string | null,
        state?: string | null,
        postalCode?: string | null,
        country?: string | null,
      } | null,
      phone?:  {
        __typename: "PhoneNumber",
        phoneNumber?: string | null,
        phoneNumberType?: string | null,
      } | null,
      eachMonthContribution?: number | null,
      monthlyContribution?: number | null,
      socialValues?: Array< string | null > | null,
      timeHorizon?: string | null,
      timeHorizonOrg?: string | null,
      controlPerson?:  {
        __typename: "ControlPerson",
        isControlPerson?: string | null,
        controlCompanySymbols?: Array< string | null > | null,
      } | null,
      politicalExposure?:  {
        __typename: "PoliticalExposure",
        isPoliticallyExposed?: string | null,
        immediateFamilyMembers?: Array< string | null > | null,
        politicalOrganizationName?: string | null,
      } | null,
      exchangeAffiliation?:  {
        __typename: "ExchangeAffiliation",
        isAffiliatedExchangeOrFINRA?: string | null,
        affiliatedApproval?: Array< string | null > | null,
        firmName?: string | null,
      } | null,
      employment?:  {
        __typename: "Employment",
        employmentStatus?: string | null,
        employer?: string | null,
        positionEmployed?: string | null,
      } | null,
      investmentProfile?:  {
        __typename: "InvestmentProfile",
        investmentObjective?: string | null,
        investmentExperience?: string | null,
        annualIncomeUSD?:  {
          __typename: "CustomRange",
          min?: number | null,
          max?: number | null,
        } | null,
        liquidWorthUSD?: string | null,
        totalNetWorthUSD?:  {
          __typename: "CustomRange",
          min?: number | null,
          max?: number | null,
        } | null,
        totalNetWorthUSDOrg?: string | null,
        riskTolerance?: string | null,
        federalTaxBracketPercentage?: number | null,
      } | null,
      catReporting?:  {
        __typename: "CatReporting",
        catAccountholderType?: string | null,
      } | null,
      applicationSignature?:  {
        __typename: "ApplicationSignature",
        eSigned?: boolean | null,
        imageSource?: string | null,
        snapImageSource?: string | null,
        snapImageReference?: string | null,
        snapImagePhotoIdReference?: string | null,
      } | null,
      closeReason?: string | null,
      errorType?: string | null,
      flaggedAt?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
  } | null,
};

export type UserInformationByUserIdQueryVariables = {
  userId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserInformationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserInformationByUserIdQuery = {
  userInformationByUserId?:  {
    __typename: "ModelUserInformationConnection",
    items:  Array< {
      __typename: "UserInformation",
      id: string,
      userId: string,
      email: string,
      lastFourSSN: string,
      firstName?: string | null,
      lastName?: string | null,
      dateOfBirth?: string | null,
      mobileNumber?: string | null,
      usCitizen?: boolean | null,
      address?:  {
        __typename: "Address",
        streetAddress?: string | null,
        city?: string | null,
        state?: string | null,
        postalCode?: string | null,
        country?: string | null,
      } | null,
      phone?:  {
        __typename: "PhoneNumber",
        phoneNumber?: string | null,
        phoneNumberType?: string | null,
      } | null,
      eachMonthContribution?: number | null,
      monthlyContribution?: number | null,
      socialValues?: Array< string | null > | null,
      timeHorizon?: string | null,
      timeHorizonOrg?: string | null,
      controlPerson?:  {
        __typename: "ControlPerson",
        isControlPerson?: string | null,
        controlCompanySymbols?: Array< string | null > | null,
      } | null,
      politicalExposure?:  {
        __typename: "PoliticalExposure",
        isPoliticallyExposed?: string | null,
        immediateFamilyMembers?: Array< string | null > | null,
        politicalOrganizationName?: string | null,
      } | null,
      exchangeAffiliation?:  {
        __typename: "ExchangeAffiliation",
        isAffiliatedExchangeOrFINRA?: string | null,
        affiliatedApproval?: Array< string | null > | null,
        firmName?: string | null,
      } | null,
      employment?:  {
        __typename: "Employment",
        employmentStatus?: string | null,
        employer?: string | null,
        positionEmployed?: string | null,
      } | null,
      investmentProfile?:  {
        __typename: "InvestmentProfile",
        investmentObjective?: string | null,
        investmentExperience?: string | null,
        annualIncomeUSD?:  {
          __typename: "CustomRange",
          min?: number | null,
          max?: number | null,
        } | null,
        liquidWorthUSD?: string | null,
        totalNetWorthUSD?:  {
          __typename: "CustomRange",
          min?: number | null,
          max?: number | null,
        } | null,
        totalNetWorthUSDOrg?: string | null,
        riskTolerance?: string | null,
        federalTaxBracketPercentage?: number | null,
      } | null,
      catReporting?:  {
        __typename: "CatReporting",
        catAccountholderType?: string | null,
      } | null,
      applicationSignature?:  {
        __typename: "ApplicationSignature",
        eSigned?: boolean | null,
        imageSource?: string | null,
        snapImageSource?: string | null,
        snapImageReference?: string | null,
        snapImagePhotoIdReference?: string | null,
      } | null,
      closeReason?: string | null,
      errorType?: string | null,
      flaggedAt?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
  } | null,
};

export type UserInformationByEmailQueryVariables = {
  email?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserInformationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserInformationByEmailQuery = {
  userInformationByEmail?:  {
    __typename: "ModelUserInformationConnection",
    items:  Array< {
      __typename: "UserInformation",
      id: string,
      userId: string,
      email: string,
      lastFourSSN: string,
      firstName?: string | null,
      lastName?: string | null,
      dateOfBirth?: string | null,
      mobileNumber?: string | null,
      usCitizen?: boolean | null,
      address?:  {
        __typename: "Address",
        streetAddress?: string | null,
        city?: string | null,
        state?: string | null,
        postalCode?: string | null,
        country?: string | null,
      } | null,
      phone?:  {
        __typename: "PhoneNumber",
        phoneNumber?: string | null,
        phoneNumberType?: string | null,
      } | null,
      eachMonthContribution?: number | null,
      monthlyContribution?: number | null,
      socialValues?: Array< string | null > | null,
      timeHorizon?: string | null,
      timeHorizonOrg?: string | null,
      controlPerson?:  {
        __typename: "ControlPerson",
        isControlPerson?: string | null,
        controlCompanySymbols?: Array< string | null > | null,
      } | null,
      politicalExposure?:  {
        __typename: "PoliticalExposure",
        isPoliticallyExposed?: string | null,
        immediateFamilyMembers?: Array< string | null > | null,
        politicalOrganizationName?: string | null,
      } | null,
      exchangeAffiliation?:  {
        __typename: "ExchangeAffiliation",
        isAffiliatedExchangeOrFINRA?: string | null,
        affiliatedApproval?: Array< string | null > | null,
        firmName?: string | null,
      } | null,
      employment?:  {
        __typename: "Employment",
        employmentStatus?: string | null,
        employer?: string | null,
        positionEmployed?: string | null,
      } | null,
      investmentProfile?:  {
        __typename: "InvestmentProfile",
        investmentObjective?: string | null,
        investmentExperience?: string | null,
        annualIncomeUSD?:  {
          __typename: "CustomRange",
          min?: number | null,
          max?: number | null,
        } | null,
        liquidWorthUSD?: string | null,
        totalNetWorthUSD?:  {
          __typename: "CustomRange",
          min?: number | null,
          max?: number | null,
        } | null,
        totalNetWorthUSDOrg?: string | null,
        riskTolerance?: string | null,
        federalTaxBracketPercentage?: number | null,
      } | null,
      catReporting?:  {
        __typename: "CatReporting",
        catAccountholderType?: string | null,
      } | null,
      applicationSignature?:  {
        __typename: "ApplicationSignature",
        eSigned?: boolean | null,
        imageSource?: string | null,
        snapImageSource?: string | null,
        snapImageReference?: string | null,
        snapImagePhotoIdReference?: string | null,
      } | null,
      closeReason?: string | null,
      errorType?: string | null,
      flaggedAt?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
  } | null,
};

export type UserInformationByErrorTypeByFlaggedAtQueryVariables = {
  errorType?: string | null,
  flaggedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserInformationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserInformationByErrorTypeByFlaggedAtQuery = {
  userInformationByErrorTypeByFlaggedAt?:  {
    __typename: "ModelUserInformationConnection",
    items:  Array< {
      __typename: "UserInformation",
      id: string,
      userId: string,
      email: string,
      lastFourSSN: string,
      firstName?: string | null,
      lastName?: string | null,
      dateOfBirth?: string | null,
      mobileNumber?: string | null,
      usCitizen?: boolean | null,
      address?:  {
        __typename: "Address",
        streetAddress?: string | null,
        city?: string | null,
        state?: string | null,
        postalCode?: string | null,
        country?: string | null,
      } | null,
      phone?:  {
        __typename: "PhoneNumber",
        phoneNumber?: string | null,
        phoneNumberType?: string | null,
      } | null,
      eachMonthContribution?: number | null,
      monthlyContribution?: number | null,
      socialValues?: Array< string | null > | null,
      timeHorizon?: string | null,
      timeHorizonOrg?: string | null,
      controlPerson?:  {
        __typename: "ControlPerson",
        isControlPerson?: string | null,
        controlCompanySymbols?: Array< string | null > | null,
      } | null,
      politicalExposure?:  {
        __typename: "PoliticalExposure",
        isPoliticallyExposed?: string | null,
        immediateFamilyMembers?: Array< string | null > | null,
        politicalOrganizationName?: string | null,
      } | null,
      exchangeAffiliation?:  {
        __typename: "ExchangeAffiliation",
        isAffiliatedExchangeOrFINRA?: string | null,
        affiliatedApproval?: Array< string | null > | null,
        firmName?: string | null,
      } | null,
      employment?:  {
        __typename: "Employment",
        employmentStatus?: string | null,
        employer?: string | null,
        positionEmployed?: string | null,
      } | null,
      investmentProfile?:  {
        __typename: "InvestmentProfile",
        investmentObjective?: string | null,
        investmentExperience?: string | null,
        annualIncomeUSD?:  {
          __typename: "CustomRange",
          min?: number | null,
          max?: number | null,
        } | null,
        liquidWorthUSD?: string | null,
        totalNetWorthUSD?:  {
          __typename: "CustomRange",
          min?: number | null,
          max?: number | null,
        } | null,
        totalNetWorthUSDOrg?: string | null,
        riskTolerance?: string | null,
        federalTaxBracketPercentage?: number | null,
      } | null,
      catReporting?:  {
        __typename: "CatReporting",
        catAccountholderType?: string | null,
      } | null,
      applicationSignature?:  {
        __typename: "ApplicationSignature",
        eSigned?: boolean | null,
        imageSource?: string | null,
        snapImageSource?: string | null,
        snapImageReference?: string | null,
        snapImagePhotoIdReference?: string | null,
      } | null,
      closeReason?: string | null,
      errorType?: string | null,
      flaggedAt?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserInformationSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateUserInformationSubscription = {
  onCreateUserInformation?:  {
    __typename: "UserInformation",
    id: string,
    userId: string,
    email: string,
    lastFourSSN: string,
    firstName?: string | null,
    lastName?: string | null,
    dateOfBirth?: string | null,
    mobileNumber?: string | null,
    usCitizen?: boolean | null,
    address?:  {
      __typename: "Address",
      streetAddress?: string | null,
      city?: string | null,
      state?: string | null,
      postalCode?: string | null,
      country?: string | null,
    } | null,
    phone?:  {
      __typename: "PhoneNumber",
      phoneNumber?: string | null,
      phoneNumberType?: string | null,
    } | null,
    eachMonthContribution?: number | null,
    monthlyContribution?: number | null,
    socialValues?: Array< string | null > | null,
    timeHorizon?: string | null,
    timeHorizonOrg?: string | null,
    controlPerson?:  {
      __typename: "ControlPerson",
      isControlPerson?: string | null,
      controlCompanySymbols?: Array< string | null > | null,
    } | null,
    politicalExposure?:  {
      __typename: "PoliticalExposure",
      isPoliticallyExposed?: string | null,
      immediateFamilyMembers?: Array< string | null > | null,
      politicalOrganizationName?: string | null,
    } | null,
    exchangeAffiliation?:  {
      __typename: "ExchangeAffiliation",
      isAffiliatedExchangeOrFINRA?: string | null,
      affiliatedApproval?: Array< string | null > | null,
      firmName?: string | null,
    } | null,
    employment?:  {
      __typename: "Employment",
      employmentStatus?: string | null,
      employer?: string | null,
      positionEmployed?: string | null,
    } | null,
    investmentProfile?:  {
      __typename: "InvestmentProfile",
      investmentObjective?: string | null,
      investmentExperience?: string | null,
      annualIncomeUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      liquidWorthUSD?: string | null,
      totalNetWorthUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      totalNetWorthUSDOrg?: string | null,
      riskTolerance?: string | null,
      federalTaxBracketPercentage?: number | null,
    } | null,
    catReporting?:  {
      __typename: "CatReporting",
      catAccountholderType?: string | null,
    } | null,
    applicationSignature?:  {
      __typename: "ApplicationSignature",
      eSigned?: boolean | null,
      imageSource?: string | null,
      snapImageSource?: string | null,
      snapImageReference?: string | null,
      snapImagePhotoIdReference?: string | null,
    } | null,
    closeReason?: string | null,
    errorType?: string | null,
    flaggedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserInformationSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateUserInformationSubscription = {
  onUpdateUserInformation?:  {
    __typename: "UserInformation",
    id: string,
    userId: string,
    email: string,
    lastFourSSN: string,
    firstName?: string | null,
    lastName?: string | null,
    dateOfBirth?: string | null,
    mobileNumber?: string | null,
    usCitizen?: boolean | null,
    address?:  {
      __typename: "Address",
      streetAddress?: string | null,
      city?: string | null,
      state?: string | null,
      postalCode?: string | null,
      country?: string | null,
    } | null,
    phone?:  {
      __typename: "PhoneNumber",
      phoneNumber?: string | null,
      phoneNumberType?: string | null,
    } | null,
    eachMonthContribution?: number | null,
    monthlyContribution?: number | null,
    socialValues?: Array< string | null > | null,
    timeHorizon?: string | null,
    timeHorizonOrg?: string | null,
    controlPerson?:  {
      __typename: "ControlPerson",
      isControlPerson?: string | null,
      controlCompanySymbols?: Array< string | null > | null,
    } | null,
    politicalExposure?:  {
      __typename: "PoliticalExposure",
      isPoliticallyExposed?: string | null,
      immediateFamilyMembers?: Array< string | null > | null,
      politicalOrganizationName?: string | null,
    } | null,
    exchangeAffiliation?:  {
      __typename: "ExchangeAffiliation",
      isAffiliatedExchangeOrFINRA?: string | null,
      affiliatedApproval?: Array< string | null > | null,
      firmName?: string | null,
    } | null,
    employment?:  {
      __typename: "Employment",
      employmentStatus?: string | null,
      employer?: string | null,
      positionEmployed?: string | null,
    } | null,
    investmentProfile?:  {
      __typename: "InvestmentProfile",
      investmentObjective?: string | null,
      investmentExperience?: string | null,
      annualIncomeUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      liquidWorthUSD?: string | null,
      totalNetWorthUSD?:  {
        __typename: "CustomRange",
        min?: number | null,
        max?: number | null,
      } | null,
      totalNetWorthUSDOrg?: string | null,
      riskTolerance?: string | null,
      federalTaxBracketPercentage?: number | null,
    } | null,
    catReporting?:  {
      __typename: "CatReporting",
      catAccountholderType?: string | null,
    } | null,
    applicationSignature?:  {
      __typename: "ApplicationSignature",
      eSigned?: boolean | null,
      imageSource?: string | null,
      snapImageSource?: string | null,
      snapImageReference?: string | null,
      snapImagePhotoIdReference?: string | null,
    } | null,
    closeReason?: string | null,
    errorType?: string | null,
    flaggedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
