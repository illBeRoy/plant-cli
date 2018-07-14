import * as ejs from 'ejs';
import { listRecipes, loadRecipe } from './recipe';
import { readFile, writeFile } from './utils/fs';
import { logger } from './utils/logger';

export const makeReadme = async () => {
  logger.context('README');
  logger.pending('reading README template');
  const readmeTemplate = await readFile(`${__dirname}/../../assets/README.md.ejs`);

  logger.pending('gathering recipes information');
  const recipes =
    listRecipes()
      .map(name => ({ name, description: loadRecipe(name).description() }));

  logger.pending('exporting README file');
  await writeFile(`${__dirname}/../../README.md`, ejs.render(readmeTemplate, { recipes }));

  logger.success();
};

if (require.main === module) {
  makeReadme()
    .catch(() => process.exit(1));
}
