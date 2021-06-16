module.exports = {
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/tests/mocks.js'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '.+\\.(css|scss|png|jpe?g|svg|gif)$': 'jest-transform-stub'
  }
}
