import { logger } from '../utils/logger';
import { writeFile, mkdir } from '../utils/fs';
import { setCompilerOption } from '../actions/typescript';
import { npmInstall, npmInstallDev } from '../actions/npm';
import { addScript } from '../actions/packageJson';

const indexHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Title here</title>
</head>
<body>
<div id="root"></div>
<script src="./index.tsx"></script>
</body>
</html>
`;

const indexTsx = `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as style from './index.scss';

export class App extends React.Component {
  render() {
    return (
      <span className={style.hello}>Hello, world!</span>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
`

const indexScss = `.hello {
  color: red;
}
`

const externalTypesDTs = `declare module '*.scss';
`

const postCssRc = `{
  "modules": true
}`

export const addReactWithParcel = async () => {
  logger.context('React');
  logger.pending('updating typescript options');
  await setCompilerOption('lib', ['dom', 'es2015']);
  await setCompilerOption('jsx', 'react');
  logger.pending('installing react dependencies');
  await npmInstall('react');
  await npmInstall('react-dom');
  await npmInstallDev('@types/react');
  await npmInstallDev('@types/react-dom');
  logger.pending('installing parcel dependencies');
  await npmInstallDev('parcel-bundler');
  await npmInstallDev('node-sass');
  await npmInstallDev('postcss-modules');
  logger.pending('creating boilerplate files');
  await writeFile('.postcssrc', postCssRc);
  await mkdir('src');
  await writeFile('src/index.html', indexHtml);
  await writeFile('src/index.tsx', indexTsx);
  await writeFile('src/index.scss', indexScss);
  await writeFile('src/external-types.d.ts', externalTypesDTs);
  logger.pending('adding start, build scripts');
  await addScript('start', 'parcel src/index.html');
  await addScript('build', 'parcel build src/index.html --out-dir dist');
  logger.success();
}