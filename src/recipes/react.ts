import { createProjectWithReact } from '../fragments/create-project-from-react';
import { createGitRepo } from '../fragments/create-git-repo';
import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';

export const description = () =>
  'React application with typescript, jest, sass and axios';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createProjectWithReact();
  await createGitRepo();
};
