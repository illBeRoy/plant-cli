import { addExcludedFileToTSConfig, setCompilerOption } from '../actions/typescript';
import { addExpressScriptsToPackageJson } from './add-express';
import { addScript, setPackageJsonValue } from '../actions/packageJson';
import { logger } from '../utils/logger';
import { addReactScriptsToPackageJson, reactScriptsTest } from './create-project-from-react';
import { addTSlintRule } from '../actions/tslint';
import { mkdir, writeFile } from '../utils/fs';
import { npmRun } from '../actions/npm';

export const e2eTestTemplate =
  `describe('End to End Tests', () => {
  it('should pass', () => {
    expect(true).toBeTruthy();
  });
});
`;

export const configureFullstackProject = async () => {
  logger.context('Fullstack');
  logger.pending('adding e2e files');
  await mkdir('test');
  await writeFile('test/app.e2e.ts', e2eTestTemplate);
  logger.pending('updating tsconfig.json');
  await setCompilerOption('module', 'commonjs');
  await setCompilerOption('allowJs', false);
  await setCompilerOption('noImplicitReturns', false);
  await setCompilerOption('noUnusedLocals', false);
  await setCompilerOption('strictNullChecks', false);
  await setCompilerOption('outDir', './dist');
  await setCompilerOption('rootDir', '.');
  await addExcludedFileToTSConfig('dist');
  await addExcludedFileToTSConfig('config-overrides.js');
  logger.pending('updating tslint.json');
  await addTSlintRule('ordered-imports', false);
  await addTSlintRule('member-access', false);
  logger.pending('updating package.json');
  await setPackageJsonValue('main', 'dist/src/server/index.js');
  await setPackageJsonValue('proxy', { '.*': { target: 'http://localhost:3001' } });
  await addReactScriptsToPackageJson('client', 'src/client');
  await addExpressScriptsToPackageJson('server', 'src/server');
  await addScript('test:server', reactScriptsTest('src/server', '--env=node'));
  await addScript('test:e2e', reactScriptsTest('test', '--testMatch **/test/**/*.e2e.ts', false));
  await addScript('test', `export CI=true && ${npmRun('test:client')} && ${npmRun('test:server')}`);
  await addScript('start', `${npmRun('start:client')} & ${npmRun('start:server')}`);
  await addScript('build', `${npmRun('build:server')} & ${npmRun('build:client')}`);
  logger.success();
};

export const tags = ['TSLint'];
