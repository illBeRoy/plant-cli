import { createTypescriptProject } from '../fragments/create-typescript-project';

export const description = () =>
  'Basic zero-conf typescript project, which initializes a git repo and uses jest for testing';

export const recipe = async () => {
  await createTypescriptProject();
};
