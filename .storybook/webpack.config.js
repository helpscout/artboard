const path = require('path')

module.exports = (baseConfig, env, config) => {
  // Typescript
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
  })
  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
