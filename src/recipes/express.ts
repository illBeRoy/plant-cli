import { createTypescriptProject } from '../fragments/create-typescript-project';
import { addExpress } from '../fragments/add-express';

export const description = () =>
  'Express-only application which utilizes json as body parser';

export const recipe = async () => {
  await createTypescriptProject();
  await addExpress();
};
