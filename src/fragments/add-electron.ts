import * as path from 'path';
import { appendToGitIgnore } from '../actions/git';
import { npmInstallDev } from '../actions/npm';
import { setPackageJsonValue, addScript } from '../actions/packageJson';
import { logger } from '../utils/logger';
import { writeFile } from '../utils/fs';

const electronConfig = (entryFile: string) => `const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 640,
    height: 480,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const watch = require('watch');
    watch.watchTree('${path.dirname(entryFile)}', () => win.reload());
  }

  win.loadFile('${entryFile}');
}

app.on('ready', createWindow);
`;

const electronBuilderConfig = {
  appId: 'com.example.changeme',
  directories: {
    output: './bin'
  }
};

export const addElectron = async (entryFile: string) => {
  logger.context('Electron');
  logger.pending('installing dependencies');
  await npmInstallDev('electron');
  await npmInstallDev('electron-builder');
  await npmInstallDev('watch');
  logger.pending('creating config');
  await writeFile('electron.config.js', electronConfig(entryFile));
  await setPackageJsonValue('main', 'electron.config.js');
  await setPackageJsonValue('build', electronBuilderConfig);
  await addScript('start:electron', `NODE_ENV=development electron .`)
  await addScript('build:electron', 'electron-builder')
  await appendToGitIgnore('bin');
  logger.success();
};

export const tags = ['Electron', 'Electron-Builder'];

