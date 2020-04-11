import { jestConfigForDOM } from '../actions/jest';
import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';
import { createEmptyProject } from '../fragments/create-empty-project';
import { addReactComponentBoilerplate } from '../fragments/add-react-component-boilerplate';
import { addJest } from '../fragments/add-jest';
import { createGitRepo } from '../fragments/create-git-repo';
import { addTypescript } from '../fragments/add-typescript';
import { addESLint } from '../fragments/add-eslint';

export const description = () =>
  'React component library that is not a standalone project';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createEmptyProject('src/index.tsx');
  await addTypescript();
  await addESLint();
  await addReactComponentBoilerplate();
  await addJest(jestConfigForDOM);
  await createGitRepo();
};
