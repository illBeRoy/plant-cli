#!/usr/bin/env node
import { ArgumentParser } from 'argparse';
import { defaultRecipe, listRecipes, loadRecipe, runRecipe } from './recipe';
import { checkForUpdates } from './updates';

export const main = async (args) => {
  await checkForUpdates();
  await runRecipe(loadRecipe(args.recipe));
};

if (require.main === module) {
  const argparser = new ArgumentParser();
  argparser.addArgument('recipe', {
    help: 'name of the recipe to create the project from',
    choices: listRecipes(),
    defaultValue: defaultRecipe(),
    type: 'string',
    nargs: '?'
  });

  main(argparser.parseArgs());
}
