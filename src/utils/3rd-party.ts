import { mkdirP } from './fs';
import { shell } from './shell';

export const getThirdPartyToolsDirectory = () =>
  `${__dirname}/../../../.3rdparty`;

export const installThirdPartyTool = async (toolName: string) => {
  await mkdirP(getThirdPartyToolsDirectory());
  await shell(`npm --prefix '${getThirdPartyToolsDirectory()}' install '${toolName}'`);
};

export const useThirdPartyTool = async (toolName: string, args = '') => {
  await shell(`${getThirdPartyToolsDirectory()}/node_modules/.bin/${toolName}${args ? ` ${args}` : ''}`);
};
