// Metro bundler configuration
// Use expo/metro-config (sub-export) instead of @expo/metro-config
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Workaround for Windows path issues with node:sea and other Node.js internals
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: false,
  // Block Node.js internal modules that cause Windows path issues
  blockList: [
    /node:.*/,
  ],
};

// Prevent Metro from trying to create invalid directories on Windows
config.watchFolders = [__dirname];

// Server configuration
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return middleware;
  },
};

module.exports = config;

