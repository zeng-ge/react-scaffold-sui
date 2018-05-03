const shoudCoverage = process.env.coverage

module.exports = {
  'testMatch': [
    '<rootDir>/app/**/__test__/*.test.js',
  ],
  'modulePaths': [
    '<rootDir>/app/',
  ],
  'setupFiles': [
    '<rootDir>/jest/setup.js',
    '<rootDir>/jest/enzyme.js',
    '<rootDir>/jest/setupStore.js',
  ],
  'moduleNameMapper': {
    '^.+\\.(css|less)$': 'identity-obj-proxy',
    '^.+\\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/mock.js',
  },
  'collectCoverage': shoudCoverage ? true : false,
  'coverageDirectory': '<rootDir>/jest/coverage',
  'verbose': true,
  'collectCoverageFrom': [
    'app/**/*.js',
    '!app/index.js',
  ],
}
