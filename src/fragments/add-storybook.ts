import { getStorybook } from '../actions/storybook';
import { logger } from '../utils/logger';
import { addScript } from '../actions/packageJson';

export const addStorybook = async () => {
  logger.context('Storybook');
  logger.pending('adding storybook to project');
  await getStorybook();
  logger.pending('adding start script');
  await addScript('start', 'tsc -w & npm storybook');
  logger.success();
};
