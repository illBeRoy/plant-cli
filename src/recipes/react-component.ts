import { jestConfigForDOM } from '../actions/jest';
import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';
import { createEmptyProject } from '../fragments/create-empty-project';
import { addVanillaReact } from '../fragments/add-vanilla-react';
import { addJest } from '../fragments/add-jest';
import { addStorybook } from '../fragments/add-storybook';
import { createGitRepo } from '../fragments/create-git-repo';
import { addTypescript } from '../fragments/add-typescript';

export const description = () =>
  'React component library that is not a standalone project';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createEmptyProject();
  await addTypescript();
  await addVanillaReact();
  await addJest(jestConfigForDOM);
  await addStorybook();
  await createGitRepo();
};
