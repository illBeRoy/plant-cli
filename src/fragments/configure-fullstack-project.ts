import { addExcludedFileToTSConfig, setCompilerOption } from '../actions/typescript';
import { addExpressScriptsToPackageJson } from './add-express';
import { addScript, setPackageJsonValue } from '../actions/packageJson';
import { logger } from '../utils/logger';
import { addReactScriptsToPackageJson } from './create-project-from-react';

export const configureFullstackProject = async () => {
  logger.context('Fullstack');
  logger.pending('updating tsconfig.json');
  await setCompilerOption('module', 'commonjs');
  await setCompilerOption('allowJs', false);
  await setCompilerOption('noImplicitReturns', false);
  await setCompilerOption('noUnusedLocals', false);
  await setCompilerOption('strictNullChecks', false);
  await setCompilerOption('outDir', './dist');
  await setCompilerOption('rootDir', '.');
  await addExcludedFileToTSConfig('dist');
  await addExcludedFileToTSConfig('config-overrides.js');
  logger.pending('updating package.json');
  await setPackageJsonValue('main', 'dist/src/server/index.js');
  await setPackageJsonValue('proxy', 'http://localhost:3001');
  await addReactScriptsToPackageJson('client');
  await addExpressScriptsToPackageJson('server', 'dist/src/server/index.js');
  await addScript('start', 'npm run start:client & npm run start:server');
  await addScript('build', 'npm run build:server & npm run build:client');
  await addScript('test', 'npm run test:client');
  logger.success();
};
