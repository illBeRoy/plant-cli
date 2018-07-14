import * as execa from 'execa';

export const shell = (cmd: string): Promise<string> =>
  execa
    .shell(cmd)
    .then(o => o.stdout);
