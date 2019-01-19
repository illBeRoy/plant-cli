import { npmInstallDev } from '../actions/npm';
import { addScript } from '../actions/packageJson';
import { createTSConfig } from '../actions/typescript';
import { logger } from '../utils/logger';

export const addTypescript = async () => {
  logger.context('Typescript');
  logger.pending('installing dependencies');
  await npmInstallDev('typescript');
  await npmInstallDev('@types/node');
  logger.pending('creating config');
  await createTSConfig();
  logger.pending('adding scripts');
  await addScript('build:typescript', 'tsc');
  await addScript('build', 'npm run build:typescript');
  await addScript('watch:typescript', 'tsc -w');
  await addScript('watch', 'npm run watch:typescript');
  logger.success();
};

export const tags = ['Typescript'];
