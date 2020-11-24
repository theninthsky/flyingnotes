const rewireStyledComponents = require('react-app-rewire-styled-components')

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env, { displayName: process.env.NODE_ENV !== 'production' })

  return config
}
