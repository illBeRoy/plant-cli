import { fromJson, toJson } from '../utils/json';
import { readFile, writeFile } from '../utils/fs';

export const initTSLint = async () => {
  await writeFile('tslint.json', toJson({}));
}

export const addTSlintRule = async (rule: string, value: any) => {
  const tslintJson = fromJson(await readFile('tslint.json'));
  tslintJson.rules = tslintJson.rules || {};
  tslintJson.rules[rule] = value;
  await writeFile('tslint.json', toJson(tslintJson));
};

export const setTSLintExtends = async (preset: string) => {
  const tslintJson = fromJson(await readFile('tslint.json'));
  tslintJson.extends = [preset];
  await writeFile('tslint.json', toJson(tslintJson));
}

export const setTSLintRulesDirectory = async (rulesDirectory: string) => {
  const tslintJson = fromJson(await readFile('tslint.json'));
  tslintJson.rulesDirectory = [rulesDirectory];
  await writeFile('tslint.json', toJson(tslintJson));
}


