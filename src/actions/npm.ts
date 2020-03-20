import { shell } from '../utils/shell';
import { appendToFile, touch } from '../utils/fs';

export enum PackageManger {
  NPM = 'npm',
  YARN = 'yarn'
}

let pm: PackageManger = PackageManger.NPM;

export const setPackageManager = (packageManager: PackageManger) => pm = packageManager;

export const npmInit = async () => {
  await shell('npm init -y');
};

export const npmInstall = async (packageName: string) => {
  const cmd = pm === PackageManger.NPM ? 'install' : 'add';
  await shell(`${pm} ${cmd} '${packageName}'`);
};

export const npmInstallDev = async (packageName: string) => {
  const cmd = pm === PackageManger.NPM ? 'install' : 'add';
  await shell(`${pm} ${cmd} -D '${packageName}'`)
};

export const npmShowVersion = async (packageName: string): Promise<string> => {
  return await shell(`npm show '${packageName}' version`);
};

export const addToNPMIgnore = async (filename: string) => {
  await touch('.npmignore');
  await appendToFile('.npmignore', filename);
};

export const npx = async (command: string) => {
  await shell(`npx ${command}`);
}
