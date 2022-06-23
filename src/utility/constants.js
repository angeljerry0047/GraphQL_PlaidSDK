export const ANNUAL_INCOME = [
  {
    value: 4,
    label: 'Under $25k',
    apexValue: { min: 0, max: 25000 },
  },
  {
    value: 3,
    label: '$25k-50k',
    apexValue: { min: 25001, max: 50000 },
  },
  {
    value: 2,
    label: '$50k-100k',
    apexValue: { min: 50001, max: 100000 },
  },
  {
    value: 1,
    label: '$100k-200k',
    apexValue: { min: 100001, max: 200000 },
  },
  {
    value: 0,
    label: 'Above $200k',
    apexValue: { min: 200001, max: 300000 },
  },
];

export const CONTRIBUTIONS = [
  {
    value: 3,
    label: '$50/month',
  },
  {
    value: 2,
    label: '$60/month',
  },
  {
    value: 1,
    label: '$70/month',
  },
  {
    value: 0,
    label: 'Enter a different amount',
  },
];

export const EACH_MONTH_CONTRIBUTE = [
  {
    value: 4,
    label: '$30/month',
    contribution: 30,
  },
  {
    value: 3,
    label: '$50/month',
    contribution: 50,
  },
  {
    value: 2,
    label: '$70/month',
    contribution: 70,
  },
  {
    value: 1,
    label: '$90/month',
    contribution: 90,
  },
  {
    value: 0,
    label: '$100/month or more',
    contribution: 100,
  },
];

export const EMPLOYMENT_STATUS = [
  {
    value: 4,
    label: 'Student',
    apexValue: 'STUDENT',
  },
  {
    value: 3,
    label: 'Part-time',
    apexValue: 'EMPLOYED',
  },
  {
    value: 2,
    label: 'Full-time',
    apexValue: 'EMPLOYED',
  },
  {
    value: 1,
    label: 'Retired',
    apexValue: 'RETIRED',
  },
  {
    value: 0,
    label: 'Unemployed',
    apexValue: 'UNEMPLOYED',
  },
];

export const ESTIMATED_NET_WORTH = [
  {
    value: 4,
    label: 'Under $25k',
    apexValue: { min: 0, max: 50000 },
  },
  {
    value: 3,
    label: '$25k-50k',
    apexValue: { min: 0, max: 50000 },
  },
  {
    value: 2,
    label: '$50k-100k',
    apexValue: { min: 50001, max: 100000 },
  },
  {
    value: 1,
    label: '$100k-200k',
    apexValue: { min: 100001, max: 200000 },
  },
  {
    value: 0,
    label: 'Above $200k',
    apexValue: { min: 200001, max: 500000 },
  },
];

export const IMPORTANT_SOCIAL_VALUES = [
  {
    value: 5,
    label: 'Climate change',
  },
  {
    value: 4,
    label: 'Racial diversity',
  },
  {
    value: 3,
    label: 'Gender diversity',
  },
  {
    value: 2,
    label: 'Data protection',
  },
  {
    value: 1,
    label: 'Coporate responsibility',
  },
  {
    value: 0,
    label: 'Fuel economy and emissions',
  },
];

export const INVEST_GOALS = [
  {
    value: 4,
    label: 'Retirement',
    apexValue: 'CAPITAL_PRESERVATION',
  },
  {
    value: 3,
    label: 'Buy a house',
    apexValue: 'INCOME',
  },
  {
    value: 2,
    label: 'Start a business',
    apexValue: 'GROWTH_INCOME',
  },
  {
    value: 1,
    label: 'Build an emergency fund',
    apexValue: 'SPECULATION',
  },
  {
    value: 0,
    label: 'Pay off debt',
    apexValue: 'OTHER',
  },
];

export const INVEST_SOON = [
  {
    value: 4,
    label: 'Less than 1 year',
    apexValue: 'SHORT',
  },
  {
    value: 3,
    label: '1-3 years',
    apexValue: 'SHORT',
  },
  {
    value: 2,
    label: '3-5 years',
    apexValue: 'AVERAGE',
  },
  {
    value: 1,
    label: '5-10 years',
    apexValue: 'AVERAGE',
  },
  {
    value: 0,
    label: '10 years or more',
    apexValue: 'LONGEST',
  },
];
