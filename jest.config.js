module.exports = {
  'testMatch': [
    '<rootDir>/app/**/__test__/*.test.js',
  ],
  'modulePaths': [
    '<rootDir>/app/',
  ],
  'setupFiles': [
    '<rootDir>/jest/setup.js',
  ],
  'moduleNameMapper': {
    '^.+\\.(css|less)$': 'identity-obj-proxy',
    '^.+\\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/mock.js',
  },
  'collectCoverage': false,
  'verbose': true,
  'collectCoverageFrom': [
    'src/**/*.js',
    '!app/index.js',
  ],
}
