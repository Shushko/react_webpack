module.exports = (api) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Any time the using callback returns another value, the overall config function will be called again and a new entry will be added to the cache
  api.cache.using(() => isDevelopment);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // Polyfills will be added automatically when the usage of some feature is unsupported in target environment
        corejs: '3.37.1', // Use current core-js version
        modules: false, // Disable transformation of ES module syntax to another module type
        debug: false // Outputs to console.log the polyfills and transform plugins
      }
    ],
    [
      '@babel/preset-react',
      {
        development: isDevelopment, // This toggles behavior specific to development
        runtime: 'automatic', // Auto imports the functions that JSX transpiles to
        pure: true // It will mark top-level React method calls as pure for tree shaking
      }
    ],
    ['@babel/preset-typescript']
  ];

  const plugins = [
    '@babel/plugin-proposal-class-properties', // Let us add class properties in our classes
    isDevelopment && 'react-refresh/babel'
  ].filter(Boolean);

  return { presets, plugins };
};
