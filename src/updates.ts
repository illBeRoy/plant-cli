import { logger } from './utils/logger';
import { npmShowVersion } from './actions/npm';

export const checkForUpdates = async () => {
  const mostRecentVersion = await npmShowVersion('plant-cli');
  const currentVersion = require('../../package.json').version;

  if (currentVersion !== mostRecentVersion) {
    logger.global().info(`New version of plant is available. Update using: 'npm install -g plant-cli'`);
  }
};
