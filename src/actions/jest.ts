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
