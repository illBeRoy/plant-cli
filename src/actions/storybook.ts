import { installThirdPartyTool, useThirdPartyTool } from '../utils/3rd-party';

export const getStorybook = async () => {
  await installThirdPartyTool('@storybook/cli');
  await useThirdPartyTool('getstorybook');
};
