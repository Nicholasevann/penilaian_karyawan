const AuthConfig = {
  issuer: 'https://git.digitalamoeba.id',
  clientId: '1ad12a40fdbe15a6c175e404d24303811829734b0c5b999efa922e9870f3f859',
  clientSecret:
    '314875f3b147edfe91e0afb7a5cab1353a9ca3cbb433ba55ff3e69df926abd0e',
  redirectUrl: 'id.digitalamoeba.ideabox.mobile://Login',
  scopes: ['profile', 'email', 'read_user'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://git.digitalamoeba.id/oauth/authorize',
    tokenEndpoint: 'https://git.digitalamoeba.id/oauth/token',
    revocationEndpoint: 'https://git.digitalamoeba.id/oauth/revoke',
  },
};

const defaultAuthState = {
  hasLoggedInOnce: false,
  token: '',
  expireAt: '',
  name: '',
  email: '',
  id: '',
  provider: '',
  provider_id: '',
  job_title: '',
};
const defaultAuthStateLogin = {
  email: '',
  password: '',
};

export {defaultAuthState, AuthConfig, defaultAuthStateLogin};
