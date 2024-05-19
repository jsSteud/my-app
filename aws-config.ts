import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-1_dRVNMS6rJ', // z.B. 'us-east-1_XXXXXXX'
  ClientId: '12mlq7vp6lo65vt26b622giv79' // z.B. 'XXXXXXXXXXXXXXXXXXXXXX'
};

export default new CognitoUserPool(poolData);
