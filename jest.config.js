const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!jose|openid-client|@panva|oidc-token-hash|uuid)/',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        target: 'es2020',
        transform: {
          react: {
            runtime: 'automatic'
          }
        }
      }
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^next-auth$': '<rootDir>/node_modules/next-auth/index',
    '^next-auth/jwt$': '<rootDir>/node_modules/next-auth/jwt',
    '^jose$': '<rootDir>/node_modules/jose/dist/node/cjs/index.js'
  },
  testTimeout: 10000,
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  moduleDirectories: ['node_modules', '<rootDir>'],
}

module.exports = createJestConfig(customJestConfig)