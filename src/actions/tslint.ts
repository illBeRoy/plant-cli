import { fromJson, toJson } from '../utils/json';
import { readFile, writeFile } from '../utils/fs';

export const setTSlintRule = async (rule: string, value: any) => {
  const tslintJson = fromJson(await readFile('tslint.json'));
  tslintJson.rules = tslintJson.rules || {};
  tslintJson.rules[rule] = value;
  await writeFile('tslint.json', toJson(tslintJson));
};
