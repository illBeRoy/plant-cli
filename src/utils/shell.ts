import * as execa from 'execa';

export const shell = (cmd: string, { interactive = false } = {}): Promise<string> =>
  execa
    .shell(cmd, { stdio: interactive ? 'inherit' : 'pipe' })
    .then(o => o.stdout);
