const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web', // Compile for usage in a browser-like environment
  devtool: 'inline-source-map', // Generate source map for dev mode
  plugins: [
    new ReactRefreshPlugin() // Enable "Fast Refresh" plugin (Hot Reloading) for React components
  ]
};
