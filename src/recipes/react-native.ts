import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';
import { createReactNativeProject } from '../fragments/create-react-native-project';
import { addTSLint } from '../fragments/add-tslint';
import { createGitRepo } from '../fragments/create-git-repo';

export const description = () =>
  'React Native application with typescript, sass and jest';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createReactNativeProject();
  await addTSLint();
  await createGitRepo();
};
