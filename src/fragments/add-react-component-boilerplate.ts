import { npmInstallDev } from '../actions/npm';
import { addPeerDependency, addScript } from '../actions/packageJson';
import { logger } from '../utils/logger';
import { setCompilerOption } from '../actions/typescript';
import { writeFile } from '../utils/fs';

const indexTsx = `import * as React from 'react';
import { render } from 'react-dom';

class App extends React.PureComponent {
  render() {
    return (
      <span>Hello, world</span>
    );
  }
}

render(<App />, document.getElementById('root'));
`

const indexHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Title here</title>
</head>
<body>
<div id="root"></div>
<script src="./src/index.tsx"></script>
</body>
</html>
`

export const addReactComponentBoilerplate = async () => {
  logger.context('React');
  logger.pending('installing react as peer and dev dependency');
  await addPeerDependency('react');
  await npmInstallDev('react');
  await npmInstallDev('@types/react');
  logger.pending('adding dev dependencies')
  await npmInstallDev('react-dom');
  await npmInstallDev('@types/react-dom');
  await npmInstallDev('parcel-bundler');
  logger.pending('updating configuration');
  await setCompilerOption('lib', ['dom', 'es2015']);
  await setCompilerOption('jsx', 'react');
  logger.pending('creating boilerplate files');
  await writeFile('index.html', indexHtml);
  await writeFile('src/index.tsx', indexTsx);
  logger.pending('adding start, build scripts');
  await addScript('start', 'parcel index.html');
  await addScript('build', 'parcel build index.html --out-dir dist');
  logger.success();
};

export const tags = ['React', 'Parcel'];
