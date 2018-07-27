import { createProjectWithReact } from '../fragments/create-project-from-react';
import { createGitRepo } from '../fragments/create-git-repo';
import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';
import { addExpress, expressReactEntryPointTemplate } from '../fragments/add-express';
import { configureFullstackProject } from '../fragments/configure-fullstack-project';

export const description = () =>
  'Fullstack React & Express application with typescript, jest and sass modules';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createProjectWithReact('src/client');
  await addExpress(expressReactEntryPointTemplate, 'src/server');
  await configureFullstackProject();
  await createGitRepo();
};
