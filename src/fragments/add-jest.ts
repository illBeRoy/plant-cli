import { npmInstallDev } from '../actions/npm';
import { addScript, setPackageJsonValue } from '../actions/packageJson';
import { jestConfigForNode } from '../actions/jest';
import { logger } from '../utils/logger';

export const addJest = async (template) => {
  logger.context('Jest');
  logger.pending('installing dependencies');
  await npmInstallDev('jest');
  await npmInstallDev('@types/jest');
  await npmInstallDev('ts-jest');
  logger.pending('creating config');
  await setPackageJsonValue('jest', template);
  await addScript('test', 'jest');
  logger.success();
};
