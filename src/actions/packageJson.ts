import { fromJson, toJson } from '../utils/json';
import { readFile, writeFile } from '../utils/fs';

export const readPackageJson = async () => {
  return fromJson(await readFile('package.json'));
};

export const writePackageJson = async (contents) => {
  await writeFile('package.json', toJson(contents));
};

export const setPackageJsonValue = async (key: string, value: any) => {
  const packageJson = await readPackageJson();
  packageJson[key] = value;
  await writePackageJson(packageJson);
};

export const addScript = async (scriptName: string, command: string) => {
  const packageJson = await readPackageJson();
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts[scriptName] = command;
  await writePackageJson(packageJson);
};
