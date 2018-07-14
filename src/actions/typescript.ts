import { writeFile } from '../utils/fs';
import { toJson } from '../utils/json';

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
