module.exports = {
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '.+\\.(css|scss|png|jpe?g|svg|gif)$': 'jest-transform-stub'
  }
}
