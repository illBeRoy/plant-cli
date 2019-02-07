import { installThirdPartyTool, useThirdPartyTool } from '../utils/3rd-party';

export const expo = async (args = '') => {
  await installThirdPartyTool('expo-cli');
  await useThirdPartyTool('expo', args, true);
};
