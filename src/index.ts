#!/usr/bin/env node
import { ArgumentParser } from 'argparse';
import { defaultRecipe, listRecipes, loadRecipe, runRecipe } from './recipe';
import { checkForUpdates } from './updates';
import { PackageManger, setPackageManager } from './actions/npm';

export const main = async (args) => {
  console.log(args);
  setPackageManager(args.package_manager);
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

  argparser.addArgument(['-p', '--package-manager'], {
    help: 'package manager to use for initialization',
    choices: Object.keys(PackageManger).map(k => PackageManger[k]),
    defaultValue: PackageManger.NPM
  })

  main(argparser.parseArgs());
}
