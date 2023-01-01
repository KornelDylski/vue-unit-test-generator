module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  collectCoverage: true,
  collectCoverageFrom: ['./example/*.{js,vue}', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>jest.setup.js'],
};
