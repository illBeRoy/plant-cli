import { appendToGitIgnore, createGitIgnore, gitInit } from '../actions/git';
import { logger } from '../utils/logger';

export const createGitRepo = async () => {
  logger.context('GIT');
  logger.pending('init');
  await gitInit();
  logger.pending('creating .gitignore');
  await createGitIgnore();
  await appendToGitIgnore('dist');
  await appendToGitIgnore('build');
  logger.success();
};
