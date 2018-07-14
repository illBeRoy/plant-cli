import { logger } from '../utils/logger';
import { mkdir, touch } from '../utils/fs';
import { npmInit } from '../actions/npm';
import { addScript, setPackageJsonValue } from '../actions/packageJson';

export const createEmptyProject = async () => {
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
};
