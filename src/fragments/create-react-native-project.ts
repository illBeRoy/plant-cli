import { rmdirSync } from 'fs';
import { npmInstallDev } from '../actions/npm';
import { addScript } from '../actions/packageJson';
import { reactNativeInit } from '../actions/react-native-cli';
import { createTSConfig, defaultTSConfig } from '../actions/typescript';
import { parentDirOf, writeFile, mkdirP } from '../utils/fs';
import { logger } from '../utils/logger';

const metroConfigurationWithSass = `const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-sass-transformer")
    },
    resolver: {
      sourceExts: [...sourceExts, "scss", "sass"]
    }
  };
})();`

const externalTypesDTS = `declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
`;

const reactNativeTSConfig = {
  ...defaultTSConfig,
  compilerOptions: {
    ...defaultTSConfig.compilerOptions,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    jsx: 'react-native'
  },
  include: [
    ...defaultTSConfig.include,
    'App.tsx'
  ]
}

export const createReactNativeProject = async () => {
  logger.context('React Native');
  logger.pending('initializing project (this might take a little while)');
  const projectDir = process.cwd();
  const projectName = projectDir.split('/').pop();
  process.chdir(parentDirOf(projectDir));
  rmdirSync(projectDir);
  await reactNativeInit(projectName);
  process.chdir(projectDir);
  logger.pending('configuring project');
  await createTSConfig(reactNativeTSConfig);
  logger.success();

  logger.context('SASS');
  logger.pending('installing dependencies');
  await npmInstallDev('node-sass');
  await npmInstallDev('react-native-sass-transformer');
  logger.pending('configuring project');
  await writeFile('metro.config.js', metroConfigurationWithSass)
  await addScript('test', 'jest');
  await mkdirP('src');
  await writeFile('src/external-types.d.ts', externalTypesDTS);
  logger.success();
}

export const tags = ['React Native', 'SASS', 'Typescript'];
