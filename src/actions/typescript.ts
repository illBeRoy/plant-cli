import { readFile, writeFile } from '../utils/fs';
import { toJson } from '../utils/json';
import { guardPromise } from '../utils/promise';

const defaultTSConfig = {
  compilerOptions: {
    target: 'es5',
    module: 'commonjs',
    lib: ['es2015'],
    sourceMap: true,
    outDir: './dist',
    rootDir: './',
    moduleResolution: 'node',
    allowSyntheticDefaultImports: false
  },
  files: [
    './src/index.ts'
  ],
  exclude: [
    'node_modules',
    'dist'
  ]
};

export const createTSConfig = async (tsConfig = defaultTSConfig) => {
  await writeFile('tsconfig.json', toJson(tsConfig));
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
