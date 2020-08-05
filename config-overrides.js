/* eslint-disable @typescript-eslint/no-var-requires */
const {
  override,
  addBabelPlugins,
  addWebpackAlias,
  addDecoratorsLegacy,
} = require('customize-cra');
const path = require('path');

const overrideProcessEnv = (value) => (config) => {
  const { plugins } = config;
  const plugin = plugins.find((p) => p.constructor.name === 'DefinePlugin');
  const processEnv = plugin.definitions['process.env'] || {};

  plugin.definitions['process.env'] = {
    ...processEnv,
    ...value,
  };

  return config;
};

module.exports = override(
  ...addBabelPlugins(
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ),
  addDecoratorsLegacy(),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    '@components': path.resolve(__dirname, './src/components'),
    '@router': path.resolve(__dirname, './src/router'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@store': path.resolve(__dirname, './src/store'),
    '@utils': path.resolve(__dirname, './src/utils'),
    '@guards': path.resolve(__dirname, './src/guards'),
  }),

  overrideProcessEnv({
    API_URL: JSON.stringify(process.env.API_URL || '__API_URL'),
    AIS_LOGIN_URL: JSON.stringify(process.env.AIS_LOGIN_URL || '__AIS_LOGIN_URL'),
    GOOGLE_LOGIN_ID: JSON.stringify(process.env.GOOGLE_LOGIN_ID || '__GOOGLE_LOGIN_ID'),
  }),
);
