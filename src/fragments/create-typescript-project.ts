import { logger } from '../utils/logger';
import { terminate } from '../utils/flow';
import { isDirEmpty, mkdir, touch } from '../utils/fs';
import { npmInit, npmInstallDev } from '../actions/npm';
import { addScript, setPackageJsonValue } from '../actions/packageJson';
import { appendToGitIgnore, createGitIgnore, gitInit } from '../actions/git';
import { createTSConfig } from '../actions/typescript';
import { getDefaultJestConfig } from '../actions/jest';

export const createTypescriptProject = async () => {
  if (!await isDirEmpty()) {
    logger.global().fail('Current directory is not empty. cannot proceed');
    terminate();
  }

  await mkdir('src');
  await mkdir('test');
  await mkdir('dist');
  await touch('src/index.ts');

  logger.context('NPM');
  logger.pending('init');
  await npmInit();
  logger.pending('creating config');
  await setPackageJsonValue('main', 'dist/src/index.js');
  addScript('start', 'node .');
  logger.success();

  logger.context('GIT');
  logger.pending('init');
  await gitInit();
  logger.pending('creating .gitignore');
  await createGitIgnore();
  await appendToGitIgnore('dist');
  logger.success();

  logger.context('Typescript');
  logger.pending('installing dependencies');
  await npmInstallDev('typescript');
  await npmInstallDev('@types/node');
  logger.pending('creating config');
  await createTSConfig();
  logger.pending('adding scripts');
  await addScript('build:typescript', 'tsc');
  await addScript('watch:typescript', 'tsc -w');
  logger.success();

  logger.context('Jest');
  logger.pending('installing dependencies');
  await npmInstallDev('jest');
  await npmInstallDev('@types/jest');
  await npmInstallDev('ts-jest');
  logger.pending('creating config');
  await setPackageJsonValue('jest', getDefaultJestConfig());
  await addScript('test', 'jest');
  logger.success();
};
