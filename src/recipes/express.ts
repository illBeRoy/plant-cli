import { createEmptyProject } from '../fragments/create-empty-project';
import { addExpress } from '../fragments/add-express';
import { addTypescript } from '../fragments/add-typescript';
import { addJest } from '../fragments/add-jest';
import { createGitRepo } from '../fragments/create-git-repo';
import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';

export const description = () =>
  'Express-only application which utilizes json as body parser';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createEmptyProject();
  await createGitRepo();
  await addTypescript();
  await addJest();
  await addExpress();
};
