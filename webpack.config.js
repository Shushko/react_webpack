const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

const getAddons = (addonsArgs) => {
  const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];

  return addons.filter(Boolean).map((name) => require(`./webpack.${name}.config.js`));
};

module.exports = ({ addon }) => {
  const envConfig =
    process.env.NODE_ENV === 'development' ? require(`./webpack.dev.config.js`) : require(`./webpack.prod.config.js`);

  return merge(commonConfig, envConfig, ...getAddons(addon));
};
