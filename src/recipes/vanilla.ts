import { jestConfigForNode } from '../actions/jest';
import { createEmptyProject } from '../fragments/create-empty-project';
import { addTypescript } from '../fragments/add-typescript';
import { addJest } from '../fragments/add-jest';
import { createGitRepo } from '../fragments/create-git-repo';
import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';
import { addTSLint } from '../fragments/add-tslint';

export const description = () =>
  'Basic zero-conf typescript project, which initializes a git repo and uses jest for testing';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createEmptyProject();
  await createGitRepo();
  await addTypescript();
  await addTSLint();
  await addJest(jestConfigForNode);
};
