export const getDefaultJestConfig = () => {
  return {
    transform: {
      '\.(ts|tsx)$': 'ts-jest'
    },
    roots: [
      'src',
      'test'
    ],
    testRegex: '^.+\\.spec\\.(ts|tsx|js)?$',
    moduleFileExtensions: [
      'ts',
      'tsx',
      'js'
    ]
  };
};
