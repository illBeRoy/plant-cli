import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';
import { addTypescript } from '../fragments/add-typescript';
import { addJest } from '../fragments/add-jest';
import { jestConfigForNode } from '../actions/jest';
import { addTSLint } from '../fragments/add-tslint';
import { addReactNodeGUIWithParcel } from '../fragments/add-react-nodegui-with-parcel';
import { createGitRepo } from '../fragments/create-git-repo';
import { createEmptyProject } from '../fragments/create-empty-project';
import { addESLint } from '../fragments/add-eslint';

export const description = () =>
  'React-NodeGUI application with typescript, jest and sass, powered by the parcel bundler (experimental)';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createEmptyProject('src/index.tsx');
  await createGitRepo();
  await addTypescript();
  await addJest(jestConfigForNode);
  await addESLint();
  await addReactNodeGUIWithParcel();
};
