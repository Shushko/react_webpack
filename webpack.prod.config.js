const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'browserslist', // Use browserslist rules from package.json
  devtool: false, // Disable source-map
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/js/main.[contenthash:8].js', // Add hash to avoid caching
    assetModuleFilename: 'static/media/[name].[contenthash:8][ext]' // Add hash to avoid caching
  },
  module: {
    rules: [
      // Use MiniCssExtractPlugin loader instead of style-loader to extract styles into a separate css file
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    })
  ],
  optimization: {
    minimize: true, // Minimize the bundle using the TerserPlugin or the plugin(s) specified in optimization.minimizer.
    usedExports: true, // Remove unused exports and rename/reduce function (class) names
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true, // Enable name mangling
          compress: true, // Activate compression
          output: {
            comments: false // Omit comments in output
          }
        },
        extractComments: false // Disable extracting comments to separate file (foo.js.LICENSE.txt)
      }),
      new ImageMinimizerPlugin({
        // Image minimization
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 8 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }]
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            ]
          }
        }
      })
    ]
  },
  performance: {
    // Checking the maximum weight of the bundle
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
