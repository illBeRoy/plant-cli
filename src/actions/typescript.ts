import { readFile, writeFile } from '../utils/fs';
import { fromJson, toJson } from '../utils/json';

const defaultTSConfig = {
  compilerOptions: {
    target: 'es5',
    module: 'commonjs',
    lib: ['es2015'],
    sourceMap: true,
    outDir: './dist',
    rootDir: './',
    moduleResolution: 'node',
  },
  include: [
    'src'
  ],
  exclude: [
    'node_modules',
    'dist'
  ]
};

export const createTSConfig = async (tsConfig = defaultTSConfig) => {
  await writeFile('tsconfig.json', toJson(tsConfig));
};

export const setCompilerOption = async (key: string, value: any) => {
  const tsconfig = fromJson(await readFile('tsconfig.json'));
  await writeFile(
    'tsconfig.json',
    toJson({
      ...tsconfig,
      compilerOptions: {
        ...(tsconfig.compilerOptions || {}),
        [key]: value
      }
    }));
};

export const addExcludedFileToTSConfig = async (dirname: string) => {
  const tsconfig = fromJson(await readFile('tsconfig.json'));
  await writeFile(
    'tsconfig.json',
    toJson({
      ...tsconfig,
      exclude: [
        ...(tsconfig.exclude || []),
        dirname
      ]
    }));
};

export const moduleDeclaration = (moduleName: string) => {
  return `declare module '${moduleName}';`;
};

export const replaceImport = async (filename: string, from: string, to: string) => {
  const tsFile = await readFile(filename);
  const output = tsFile
    .split('\n')
    .map(line => line.startsWith('import') ? line.replace(`'${from}';`, `'${to}'`) : line)
    .join('\n');
  await writeFile(filename, output);
};
