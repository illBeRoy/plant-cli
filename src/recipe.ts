import { TerminationError } from './utils/flow';
import { logger } from './utils/logger';
import { readdirSync } from "fs";
import { guardPromise } from './utils/promise';
import { writeFile } from './utils/fs';

interface RecipeType {
  recipe(): Promise<void>;
  description(): string;
}

export const defaultRecipe = () => 'vanilla';

export const listRecipes = (): string[] =>
  readdirSync(`${__dirname}/recipes`)
    .filter(filename => filename.endsWith('.js'))
    .map(filename => filename.substr(0, filename.length - '.js'.length));

export const loadRecipe = (recipeName: string): RecipeType =>
  require(`${__dirname}/recipes/${recipeName}`);

export const runRecipe = async (recipe: RecipeType) => {
  try {
    await recipe.recipe();
    logger.global().success('Done!');
    process.exit(0);
  } catch (err) {
    if (err instanceof TerminationError) {
      logger.global().fail('Aborted.');
    } else {
      logger.global().fail('Unexpected error occurred. Postmortem available at plant-error.log');
      await guardPromise(writeFile('plant-error.log', err.toString()));
    }
    process.exit(1);
  }
};
