import { logger } from './utils/logger';
import { gitHasUncommittedChanges, gitBranch } from './actions/git';
import { terminate } from './utils/flow';

export const prepareForPublish = async () => {
  logger.context('GIT');
  logger.pending('ensuring git readiness for publish');
  if (await gitBranch() !== 'master') {
    logger.fail('Cannot publish from any branch other than "master"');
    terminate();
  }
  if (await gitHasUncommittedChanges()) {
    logger.fail('Cannot publish while there are uncommitted changes');
    terminate();
  }
  logger.success();
};

if (require.main === module) {
  prepareForPublish()
    .catch(() => process.exit(1));
}
