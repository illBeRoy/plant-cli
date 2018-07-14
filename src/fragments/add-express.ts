import { logger } from '../utils/logger';
import { npmInstall, npmInstallDev } from '../actions/npm';
import { writeFile } from '../utils/fs';

const expressEntryPointTemplate =
`import * as express from 'express';

const app = express()
  .use(express.json());

if (require.main === module) {
  app.listen(3000);
}
`;

export const addExpress = async () => {
  logger.context('Express');
  logger.pending('installing dependencies');
  await npmInstall('express');
  await npmInstallDev('@types/express');

  logger.pending('creating entry file');
  await writeFile('src/index.ts', expressEntryPointTemplate);

  logger.success();
};
