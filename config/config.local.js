'use strict';
const path = require('path');

const ENV_DEV_KEY = 'dev';
const ENV_TEST_KEY = 'test';

const currentEnv = ENV_DEV_KEY;

const baseConfig = require(path.resolve('../databaseConfig/goods.base.json'));
const commConfig = require(path.resolve('../databaseConfig/goods.comm.json'));
const prodConfig = require(path.resolve('../databaseConfig/goods.prod.json'));

module.exports = () => {
  const config = {};

  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.sequelize = {
    datasources: [
      baseConfig[currentEnv],
      commConfig[currentEnv],
      prodConfig[currentEnv],
    ],
  };

  return config;
};
