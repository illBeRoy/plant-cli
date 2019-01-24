import { logger } from '../utils/logger';
import { rm, writeFile, mkdir } from '../utils/fs';
import { expo } from '../actions/expo';
import { npmInstallDev } from '../actions/npm';
import { createTSConfig, setCompilerOption } from '../actions/typescript';
import { setPackageJsonValue, addScript } from '../actions/packageJson';
import { jestConfigForReactNative } from '../actions/jest';

export const appTs = `import App from './src/App';
export default App;`

export const appTsx = `import * as React from 'react';
import { Text, View } from 'react-native';

export default () => (
  <View style={{ marginTop: 50 }}>
    <Text>Hello, World!</Text>
  </View>
);
`

export const appSpecTsx = `import * as React from 'react';
import * as renderer from 'react-test-renderer';

import App from './App';

describe('App', () => {
  it('snapshot test', () => {
    const tree = renderer.create(
      <App />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
`;

export const createProjectFromExpo = async () => {
  logger.context('Expo');
  logger.pending('initializing project (this might take a little while)');
  const cwd = process.cwd();
  await expo('init --template blank --npm --workflow managed .');
  process.chdir(cwd);
  logger.pending('tweaking project to use typescript');
  await rm('babel.config.js');
  await rm('App.js');
  await writeFile('App.ts', appTs);
  await mkdir('src');
  await writeFile('src/App.tsx', appTsx);
  await writeFile('src/App.spec.tsx', appSpecTsx);
  logger.success();

  logger.context('Typescript');
  logger.pending('installing dependencies');
  await npmInstallDev('typescript');
  await npmInstallDev('@types/react');
  await npmInstallDev('@types/expo');
  logger.pending('configuring');
  await createTSConfig();
  await setCompilerOption('jsx', 'react-native');
  logger.success();

  logger.context('Jest');
  logger.pending('installing dependencies');
  await npmInstallDev('jest');
  await npmInstallDev('ts-jest');
  await npmInstallDev('jest-expo');
  await npmInstallDev('react-test-renderer');
  await npmInstallDev('@types/jest');
  await npmInstallDev('@types/react-test-renderer');
  logger.pending('configuring');
  await setPackageJsonValue('jest', jestConfigForReactNative);
  await addScript('test', 'jest');
  logger.success();
}

export const tags = ['React Native', 'Expo', 'Typescript', 'Jest'];
