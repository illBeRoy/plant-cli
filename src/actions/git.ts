import { shell } from '../utils/shell';
import { httpGet } from '../utils/network';
import { readFile, writeFile } from '../utils/fs';

export const gitInit = async () => {
  await shell('git init');
};

export const createGitIgnore = async () => {
  const gitIgnoreFile = await httpGet('https://www.gitignore.io/api/node,webstorm,visualstudiocode');
  await writeFile('.gitignore', gitIgnoreFile);
};

export const appendToGitIgnore = async (line: string) => {
  const gitignore = await readFile('.gitignore');
  await writeFile('.gitignore', `${gitignore}\n${line}`);
};
