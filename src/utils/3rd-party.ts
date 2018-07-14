import { shell } from './shell';

export const getThirdPartyToolsDirectory = () =>
  `${__dirname}/../../../.3rdparty`;

export const installThirdPartyTool = async (toolName: string) => {
  await shell(`mkdir -p ${getThirdPartyToolsDirectory()}`);
  await shell(`npm --prefix '${getThirdPartyToolsDirectory()}' install '${toolName}'`);
};

export const useThirdPartyTool = async (toolName: string, args = '') => {
  await shell(`${getThirdPartyToolsDirectory()}/node_modules/.bin/${toolName}${args ? ` ${args}` : ''}`);
};
