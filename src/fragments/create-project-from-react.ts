import { logger } from '../utils/logger';
import { createReactApp } from '../actions/create-react-app';
import { npmInstallDev } from '../actions/npm';
import { addScript } from '../actions/packageJson';
import { appendToFile, mv, writeFile } from '../utils/fs';
import { moduleDeclaration, replaceImport } from '../actions/typescript';

const configOverridesTemplate =
  `var rewireSass = require('react-app-rewire-scss');

module.exports = function override(config, env) {
  config = rewireSass(config, env);
  return config;
}
`;

export const createProjectWithReact = async () => {
  logger.context('Create React App');
  logger.pending('initializing project (this might take a little while)');
  await createReactApp('. --use-npm --scripts-version=react-scripts-ts');
  logger.success();

  logger.context('SASS');
  logger.pending('installing dependencies');
  await npmInstallDev('node-sass');
  await npmInstallDev('sass-loader');
  logger.pending('renaming files');
  await mv('src/App.css', 'src/App.scss');
  await mv('src/index.css', 'src/index.scss');
  logger.pending('replacing imports');
  await replaceImport('src/App.tsx', './App.css', './App.scss');
  await replaceImport('src/index.tsx', './index.css', './index.scss');
  logger.pending('adding declarations');
  await mv('images.d.ts', 'src/external-types.d.ts');
  await appendToFile('src/external-types.d.ts', moduleDeclaration('*.scss'));
  logger.success();

  logger.context('React App Rewired');
  logger.pending('installing dependencies');
  await npmInstallDev('react-app-rewired');
  await npmInstallDev('react-app-rewire-scss');
  logger.pending('rewiring npm scripts');
  await addScript('start', 'react-app-rewired start --scripts-version react-scripts-ts');
  await addScript('build', 'react-app-rewired build --scripts-version react-scripts-ts');
  await addScript('test', 'react-app-rewired test --scripts-version react-scripts-ts --env=jsdom');
  logger.pending('create config overrides');
  await writeFile('config-overrides.js', configOverridesTemplate);
  logger.success();
};
