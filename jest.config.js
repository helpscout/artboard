const jestConfig = require('@helpscout/zero/jest')

const coverageList = ['src/**/*.{js,jsx}']

module.exports = Object.assign({}, jestConfig, {
  collectCoverageFrom: []
    .concat(jestConfig.collectCoverageFrom)
    .concat(coverageList),
})
