const jestConfig = require('@helpscout/zero/jest')

const coverageList = ['src/**/*.{js,jsx,ts,tsx}']

module.exports = Object.assign({}, jestConfig, {
  collectCoverageFrom: []
    .concat(jestConfig.collectCoverageFrom)
    .concat(coverageList),
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).js?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).ts?(x)',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'ts', 'tsx'],
})
