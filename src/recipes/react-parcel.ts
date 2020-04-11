import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';
import { addTypescript } from '../fragments/add-typescript';
import { addJest } from '../fragments/add-jest';
import { jestConfigForDOM } from '../actions/jest';
import { addReactWithParcel } from '../fragments/add-react-with-parcel';
import { createGitRepo } from '../fragments/create-git-repo';
import { createEmptyProject } from '../fragments/create-empty-project';
import { addESLint } from '../fragments/add-eslint';

export const description = () =>
  'React application with typescript, jest and sass modules, powered by the parcel bundler';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createEmptyProject('index.tsx');
  await createGitRepo();
  await addTypescript();
  await addJest(jestConfigForDOM);
  await addESLint();
  await addReactWithParcel();
};
