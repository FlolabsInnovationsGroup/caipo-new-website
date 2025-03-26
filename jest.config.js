const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '^@/components/ui/use-toast$': '<rootDir>/src/components/ui/use-toast.ts',
    '^@/components/ui/scroll-area$': '<rootDir>/src/components/ui/scroll-area.tsx',
    '^@/components/ui/([^/]+)$': '<rootDir>/src/components/ui/$1',
    '^@/components/Toast$': '<rootDir>/src/components/Toast.tsx',
    '^@/components/PricingCard$': '<rootDir>/src/components/PricingCard.tsx',
    '^openid-client$': '<rootDir>/node_modules/openid-client',
    '^next-auth$': '<rootDir>/node_modules/next-auth',
    '^next-auth/(.*)$': '<rootDir>/node_modules/next-auth/$1'
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  transformIgnorePatterns: [
    '/node_modules/(?!openid-client|next-auth).+\\.js$'
  ],
  testTimeout: 30000,
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  moduleDirectories: ['node_modules', '<rootDir>/src']
}

module.exports = createJestConfig(customJestConfig) 