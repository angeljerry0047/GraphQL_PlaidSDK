/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
  aws_project_region: 'us-east-2',
  aws_appsync_graphqlEndpoint:
    'https://a5bi4yn7gbh63phkcmxvuayvhe.appsync-api.us-east-2.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-2',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_apiKey: 'da2-fgmzbbmzzrf6bpaah6nbn4dkza',
  aws_cloud_logic_custom: [
    {
      name: 'stackwellPlaidIntegration',
      endpoint: 'https://olpe8wbyl1.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
    {
      name: 'verifyUserEmail',
      endpoint: 'https://9avcew7eb6.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
    {
      name: 'userActions',
      endpoint: 'https://4nv3dxcge1.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
    {
      name: 'apex',
      endpoint: 'https://wqk32ve7ol.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
    {
      name: 'cash',
      endpoint: 'https://mdidobdm33.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
    {
      name: 'stock',
      endpoint: 'https://tsyrztzu32.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
    {
      name: 'portfolios',
      endpoint: 'https://03wvtbvfil.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
    {
      name: 'apexDocuments',
      endpoint: 'https://6so95lpxgk.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
    {
      name: 'admin',
      endpoint: 'https://rp7zcfx1tg.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
    {
      name: 'stackwellNotification',
      endpoint: 'https://6m6he3teb1.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
    },
  ],
  aws_dynamodb_all_tables_region: 'us-east-2',
  aws_dynamodb_table_schemas: [
    {
      tableName: 'apex_user_info-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'plaid_info-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'transfers-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'transferSchedule-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'apexProposals-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'apex_event_info-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'apexAnalysisErrors-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'apexLiquidations-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'apexDocuments-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'stackwell_queue-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'apexAccountForms-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'apexBalanceHistory-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'apex_event_api_info-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'stripeCustomerInfo-dev',
      region: 'us-east-2',
    },
    {
      tableName: 'stackwellNotification-dev',
      region: 'us-east-2',
    },
  ],
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_sOTsEPAVU',
  aws_user_pools_web_client_id: '1q44ls370ueh5486qq1pg039n8',
  oauth: {
    domain: 'stackwell-user-dev.auth.us-east-2.amazoncognito.com',
    scope: ['phone', 'email', 'openid', 'profile'],
    redirectSignIn: 'https://stackwell.auth.us-east-2.amazoncognito.com/login/',
    redirectSignOut:
      'https://stackwell.auth.us-east-2.amazoncognito.com/signout/',
    responseType: 'token',
  },
  federationTarget: 'COGNITO_USER_POOLS',
};

export default awsmobile;