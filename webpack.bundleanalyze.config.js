const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      path: path.join(__dirname, 'dist'),
      reportFilename: 'report.html',
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
};
