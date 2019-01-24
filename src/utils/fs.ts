import * as fs from 'fs';
import * as path from 'path';
import { hash } from './hash';
import { getThirdPartyToolsDirectory } from './3rd-party';
import { shell } from './shell';

export const writeFile = (filename: string, content: string): Promise<void> => {
  return new Promise((res, rej) =>
    fs.writeFile(filename, content, { encoding: 'utf-8' }, err => err ? rej(err) : res()));
};

export const readFile = (filename: string): Promise<string> => {
  return new Promise((res, rej) =>
    fs.readFile(filename, { encoding: 'utf-8' }, (err, data) => err ? rej(err) : res(data)));
};

export const appendToFile = (filename: string, content: string): Promise<void> => {
  return new Promise((res, rej) =>
    fs.appendFile(filename, content, { encoding: 'utf-8' }, err => err ? rej(err) : res()));
};

export const touch = (filename: string): Promise<void> => {
  return writeFile(filename, '');
};

export const mkdir = (dirname: string): Promise<void> => {
  return new Promise((res, rej) =>
    fs.existsSync(dirname) ? res() : fs.mkdir(dirname, err => err ? rej(err): res()));
};

export const rm = (filename: string): Promise<void> => {
  return new Promise((res, rej) =>
    fs.unlink(filename, err => err ? rej(err) : res()));
}

export const mkdirP = async (dirname: string): Promise<void> => {
  await shell(`mkdir -p ${dirname}`);
};

export const ls = (dir = '.'): Promise<string[]> => {
  return new Promise((res, rej) =>
    fs.readdir(dir, (err, files) => err ? rej(err) : res(files)));
};

export const mv = (oldFilename: string, newFilename: string): Promise<void> => {
  return new Promise((res, rej) =>
    fs.rename(oldFilename, newFilename, err => err ? rej(err) : res()));
};

export const isDirEmpty = async (dir = '.'): Promise<boolean> => {
  return (await ls(dir)).length === 0;
};

export const tmp = (): string =>
  `/tmp/${hash()}`;

export const parentDirOf = (dir: string): string =>
  path.dirname(dir);
