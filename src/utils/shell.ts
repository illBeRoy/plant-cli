import * as execa from 'execa';

export const shell = (cmd: string) =>
  execa.shell(cmd, { stdio: 'ignore' });
