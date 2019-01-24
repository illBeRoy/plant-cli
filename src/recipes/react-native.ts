import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';
import { createProjectFromExpo } from '../fragments/create-project-from-expo';
import { addTSLint } from '../fragments/add-tslint';
import { createGitRepo } from '../fragments/create-git-repo';

export const description = () =>
  'React Native application generated with Expo, with typescript and jest';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createProjectFromExpo();
  await addTSLint();
  await createGitRepo();
};
