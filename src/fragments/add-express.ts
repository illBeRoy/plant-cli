import { logger } from '../utils/logger';
import { npmInstall, npmInstallDev } from '../actions/npm';
import { mkdirP, writeFile } from '../utils/fs';
import { addScript } from '../actions/packageJson';

export const expressEntryPointTemplate =
`import * as express from 'express';

export const app = express()
  .use(express.json());

if (require.main === module) {
  app.listen(3000);
}
`;

export const expressReactEntryPointTemplate =
  `import * as express from 'express';

export const app = express()
  .use(express.json())
  .use(express.static(__dirname + '/../../../build'))
  .get('/api/health', (req, res) => res.send({status: 'alive'}));

if (require.main === module) {
  app.listen(3001);
}
`;

export const addExpressScriptsToPackageJson = async (postfix = '', entry = 'src') => {
  postfix = postfix ? `:${postfix}` : '';
  await addScript(`build${postfix}`, 'tsc');
  await addScript(`start${postfix}`, `tsc-watch --onSuccess "node dist/${entry}/index.js"`);
};

export const addExpress = async (template, entrypoint: string = 'src') => {
  logger.context('Express');
  logger.pending('installing dependencies');
  await npmInstall('express');
  await npmInstallDev('@types/express');
  await npmInstallDev('tsc-watch');

  logger.pending('creating entry file');
  await mkdirP(entrypoint);
  await writeFile(`${entrypoint}/index.ts`, template);

  logger.success();
};
