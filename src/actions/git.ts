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

export const gitBranch = async () => {
  const branches = (await shell('git branch')).split('\n');
  return branches
    .find(branch => branch.startsWith('*'))
    .substr(2);
};

export const gitHasUncommittedChanges = async () => {
  const changes = await shell('git status --porcelain');
  return changes.length > 0;
};
