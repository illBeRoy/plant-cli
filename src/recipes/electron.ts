import { ensureCWDEmpty } from '../fragments/ensure-cwd-empty';
import { addTypescript } from '../fragments/add-typescript';
import { addJest } from '../fragments/add-jest';
import { jestConfigForDOM } from '../actions/jest';
import { addTSLint } from '../fragments/add-tslint';
import { addReactWithParcel } from '../fragments/add-react-with-parcel';
import { createGitRepo } from '../fragments/create-git-repo';
import { createEmptyProject } from '../fragments/create-empty-project';
import { addElectron } from '../fragments/add-electron';
import { npmInstallDev } from '../actions/npm';
import { addScript } from '../actions/packageJson';

export const description = () =>
  'Electron application with react, typescript, jest and sass modules, powered by the parcel bundler';

export const recipe = async () => {
  await ensureCWDEmpty();
  await createEmptyProject('index.tsx');
  await createGitRepo();
  await addTypescript();
  await addJest(jestConfigForDOM);
  await addTSLint();
  await addReactWithParcel({
    'start:parcel': 'parcel src/index.html --target electron --out-dir dist --public-url ./',
    'build:parcel': 'parcel build src/index.html --out-dir dist --target electron --no-source-maps --public-url ./'
  });
  await addElectron('dist/index.html');
  await npmInstallDev('concurrently');
  await addScript('start', 'concurrently -k \'npm run start:parcel\' \'npm run start:electron\'');
  await addScript('build', 'npm run build:parcel && npm run build:electron');
};
