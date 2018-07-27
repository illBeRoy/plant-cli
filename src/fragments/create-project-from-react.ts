import { logger } from '../utils/logger';
import { createReactApp } from '../actions/create-react-app';
import { npmInstallDev } from '../actions/npm';
import { addScript } from '../actions/packageJson';
import { appendToFile, mkdir, mkdirP, mv, parentDirOf, tmp, writeFile } from '../utils/fs';
import { moduleDeclaration, replaceImport } from '../actions/typescript';

const configOverridesTemplate = (entrypoint: string) =>
  `const rewireSass = require('react-app-rewire-scss');
const { getLoader } = require('react-app-rewired');

function rewireCssModules(config, env) {
  const cssRules = getLoader(config.module.rules, rule => String(rule.test) === String(/\\.css$/));
  const cssLoaderConfig = (cssRules.use || cssRules.loader || []).find(x => x.loader === require.resolve('css-loader'))
  if (cssLoaderConfig) {
  	cssLoaderConfig.options = Object.assign({}, (cssLoaderConfig.options || {}), {modules: true, camelCase: true});
  }
  return config;
}

function rewireEntryPoint(config, env) {
  const oldEntryPoint = require.cache[require.resolve(\`react-scripts-ts/config/paths.js\`)].exports.appIndexJs;
  const newEntryPoint = require.resolve('./${entrypoint}/index.tsx');
  require.cache[require.resolve(\`react-scripts-ts/config/paths.js\`)].exports.appIndexJs = newEntryPoint;
  config.entry = config.entry.map(entry => entry === oldEntryPoint ? newEntryPoint : entry);
  return config;
}

module.exports = function override(config, env) {
  config = rewireCssModules(config, env);
  config = rewireSass(config, env);
  config = rewireEntryPoint(config, env);
  return config;
}
`;

const appTsxTemplate =
  `import * as React from 'react';
import * as style from './App.scss';

class App extends React.Component {
  public render() {
    return (
      <div className={style.app}>
        <header className={style.appHeader}>
          <img src={require('./logo.svg')} className={style.appLogo} alt="logo" />
          <h1 className={style.appTitle}>Welcome to React</h1>
        </header>
        <p className={style.appIntro}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
`;

export const addReactScriptsToPackageJson = async (postfix = '') => {
  postfix = postfix ? `:${postfix}` : postfix;
  await addScript(`start${postfix}`, 'react-app-rewired start --scripts-version react-scripts-ts');
  await addScript(`build${postfix}`, 'react-app-rewired build --scripts-version react-scripts-ts');
  await addScript(`test${postfix}`, 'react-app-rewired test --scripts-version react-scripts-ts --env=jsdom');
}

export const createProjectWithReact = async (entrypoint = 'src') => {
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
  logger.pending('altering tsx files');
  await replaceImport('src/index.tsx', './index.css', './index.scss');
  await writeFile('src/App.tsx', appTsxTemplate);
  logger.pending('adding declarations');
  await mv('images.d.ts', 'src/external-types.d.ts');
  await appendToFile('src/external-types.d.ts', moduleDeclaration('*.scss'));
  logger.success();

  logger.context('React App Rewired');
  logger.pending('installing dependencies');
  await npmInstallDev('react-app-rewired');
  await npmInstallDev('react-app-rewire-scss');
  logger.pending('rewiring npm scripts');

  logger.pending('creating config overrides');
  await writeFile('config-overrides.js', configOverridesTemplate(entrypoint));

  if (entrypoint !== 'src') {
    logger.pending('moving files to new root');
    const tmpDir = tmp();
    await mv(`src`, tmpDir);
    await mkdirP(parentDirOf(entrypoint));
    await mv(tmpDir, entrypoint);
  }

  logger.success();
};
