import { shell } from '../utils/shell';

export const npmInit = async () => {
  await shell('npm init -y');
};

export const npmInstall = async (packageName: string) => {
  await shell(`npm install '${packageName}'`);
};

export const npmInstallDev = async (packageName: string) => {
  await shell(`npm install --save-dev '${packageName}'`)
};

export const npmShowVersion = async (packageName: string): Promise<string> => {
  return await shell(`npm show '${packageName}' version`);
};
