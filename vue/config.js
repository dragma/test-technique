import Constants from 'expo-constants';

const DEV_SERVER_URL = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

const ENV = {
  dev: {
    SERVER_URL: DEV_SERVER_URL,
  },
  production: {
  },
};

const getEnvVars = (env = '') => {
  if (env === null || env === undefined || env === '') return ENV.dev;
  if (env.indexOf('dev') !== -1) return ENV.dev;
  if (env.indexOf('production') !== -1) return ENV.production;
  return ENV.dev;
};

export default getEnvVars(Constants.manifest.releaseChannel);
