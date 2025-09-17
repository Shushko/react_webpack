const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'), // Entry index.tsx file
  output: {
    path: path.join(__dirname, 'dist'), // Output directory
    publicPath: '/',
    clean: true, // Clean output directory before updating
    filename: 'static/js/main.js', // Output bundle js file (+ path)
    assetModuleFilename: 'static/media/[name].[ext]' // Define output assets directory
  },
  resolve: {
    // List of extensions which user can exclude from an import path (import File from '../path/to/file')
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '...'],
    // Define root directories. Allows you to make a shorter import path ('assets/' instead '../assets/')
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    strictExportPresence: true, // Strict mod to avoid of importing non-existent objects
    rules: [
      // Apply rules for files with some extensions
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-syntax-jsx']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              api: 'modern-compiler'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.md$/i,
        use: ['markdown-loader']
      }
    ]
  },
  plugins: [
    // Generate output .html file based on the public/index.html file
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      templateParameters: {
        PUBLIC_URL: process.env.PUBLIC_URL || ''
      },
      filename: 'index.html',
      minify: process.env.NODE_ENV === 'production'
    }),
    // Copy all files from public folder to output directory (except index.html)
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'public'),
          to: path.join(__dirname, 'dist'),
          globOptions: { ignore: ['**/index.html'] }
        }
      ]
    }),
    // Define current .env file
    new Dotenv({
      path: `./.env${!!process.env.APP_ENV ? `.${process.env.APP_ENV}` : ''}`
    })
  ],
  devServer: {
    hot: true, // Hot reload
    open: false, // Open in browser
    port: 3000,
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true, // For routing using the url input
    client: {
      // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      overlay: {
        errors: true,
        warnings: true
      },
      progress: false // Prints compilation progress in percentage in the browser.
    }
  }
};
