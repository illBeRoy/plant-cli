import { installThirdPartyTool, useThirdPartyTool } from '../utils/3rd-party';

export const createReactApp = async (args = '') => {
  await installThirdPartyTool('create-react-app');
  await useThirdPartyTool('create-react-app', args);
};
