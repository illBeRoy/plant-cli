import { addToNPMIgnore, npmInstall, npmInstallDev } from '../actions/npm';
import { addPeerDependency } from '../actions/packageJson';
import { logger } from '../utils/logger';

export const addVanillaReact = async () => {
  logger.context('React');
  logger.pending('installing react as peer and dev dependency');
  await addPeerDependency('react');
  await npmInstallDev('react');
  await npmInstallDev('@types/react');
  logger.pending('updating .npmignore');
  await addToNPMIgnore('src');
  await addToNPMIgnore('tsconfig.json');
  await addToNPMIgnore('.idea');
  logger.success();
};
