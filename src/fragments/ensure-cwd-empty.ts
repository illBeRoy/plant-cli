import { terminate } from '../utils/flow';
import { logger } from '../utils/logger';
import { isDirEmpty } from '../utils/fs';

export const ensureCWDEmpty = async () => {
  if (!await isDirEmpty('.')) {
    logger.global().fail('Current directory is not empty. cannot proceed');
    terminate();
  }
};
