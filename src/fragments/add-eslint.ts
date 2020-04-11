import { npmInstallDev, npx, npmRun } from '../actions/npm';
import { addScript } from '../actions/packageJson';
import { logger } from '../utils/logger';
import { defaultPluginPackages, initESLint } from '../actions/eslint';

export const addESLint = async () => {
  logger.context('ESLint');
  logger.pending('installing dependencies');
  await npmInstallDev('eslint');
  await defaultPluginPackages.reduce((p, plugin) => p.then(() => npmInstallDev(plugin)), Promise.resolve());
  logger.pending('creating configuration');
  await initESLint();
  logger.pending('adding scripts');
  await addScript('lint', 'eslint . --ext .js,.jsx,.ts,.tsx');
  await addScript('posttest', npmRun('lint'));
  logger.pending('applying lint to project');
  await npx('eslint . --ext .js,.jsx,.ts,.tsx --fix');
  logger.success();
};

export const tags = ['ESLint'];
