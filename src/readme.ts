import * as ejs from 'ejs';
import * as dependencyTree from 'dependency-tree';
import { listRecipes, loadRecipe, getRecipeFilename, recipesDirectory } from './recipe';
import { readFile, writeFile } from './utils/fs';
import { logger } from './utils/logger';

const getTags = (recipe) =>
  dependencyTree.toList({ filename: getRecipeFilename(recipe), directory: recipesDirectory() })
    .filter(m => /src\/fragments\/.*\.js$/.test(m))
    .map(fragment => require(fragment).tags || [])
    .reduce((tags, newTags) => [...tags, ...newTags], [])
    .reduce((tags, nextTag) => tags.includes(nextTag) ? tags : [...tags, nextTag], []);

export const makeReadme = async () => {
  logger.context('README');
  logger.pending('reading README template');
  const readmeTemplate = await readFile(`${__dirname}/../../assets/README.md.ejs`);

  logger.pending('gathering recipes information');
  const recipes =
    listRecipes()
      .map(name => ({ name, description: loadRecipe(name).description(), tags: getTags(name) }))

  logger.pending('exporting README file');
  await writeFile(`${__dirname}/../../README.md`, ejs.render(readmeTemplate, { recipes }));

  logger.success();
};

if (require.main === module) {
  makeReadme()
    .catch(() => process.exit(1));
}
