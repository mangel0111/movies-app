/* eslint-env node */
const config = {
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'mjs', 'jsx', 'ts', 'tsx', 'json'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
    // This is to mock CSS imports
    '\\.css$': 'identity-obj-proxy',
    // This is to mock audio files
    '\\.mp3$': 'identity-obj-proxy',
  },
  notify: true,
  notifyMode: 'success-change',
  resetMocks: true,
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/jest/setupMocks.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.ts'],
  testMatch: [
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'esbuild-jest',
    // '^.+\\.css$': '<rootDir>/jest/cssTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  verbose: true,
};

module.exports = config;
