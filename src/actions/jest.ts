export const jestConfigForNode = {
  transform: {
    '\.(ts|tsx)$': 'ts-jest'
  },
  roots: [
    'src',
    'test'
  ],
  testEnvironment: 'node',
  testRegex: '^.+\\.spec\\.(ts|tsx|js)?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ]
};

export const jestConfigForDOM = {
  transform: {
    '\.(ts|tsx)$': 'ts-jest'
  },
  roots: [
    'src',
    'test'
  ],
  testEnvironment: 'jsdom',
  testRegex: '^.+\\.spec\\.(ts|tsx|js)?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ]
};

export const jestConfigForReactNative = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)'
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx'
  ],
  globals: {
    'ts-jest': {
      tsConfig: {
        jsx: 'react'
      }
    }
  }
}
