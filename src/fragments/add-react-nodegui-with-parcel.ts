import { logger } from '../utils/logger';
import { writeFile, mkdir } from '../utils/fs';
import { setCompilerOption } from '../actions/typescript';
import { npmInstall, npmInstallDev } from '../actions/npm';
import { addScript } from '../actions/packageJson';

const indexTsx = `import * as React from 'react';
import { Renderer, Window, View, Text } from '@nodegui/react-nodegui';

export class App extends React.Component {
  render() {
    return (
      <Window styleSheet={require('./index.scss')}>
        <View id="container">
          <Text id="text">Hello, World!</Text>
        </View>
      </Window>
    );
  }
}

Renderer.render(<App />);
`

const indexScss = `#container {
  flex: 1;
  flex-direction: column;
  min-height: '100%';
  background: #f4fcff;
  align-items: 'center';
  justify-content: 'center';
}

#text {
  color: #2E2E30;
  text-align: 'center';
}
`

const externalTypesDTs = `declare module '*.scss';
`

export const addReactNodeGUIWithParcel = async () => {
  logger.context('React');
  logger.pending('updating typescript options');
  await setCompilerOption('lib', ['dom', 'es2015']);
  await setCompilerOption('jsx', 'react');
  logger.pending('installing react dependencies');
  await npmInstall('react');
  await npmInstallDev('@types/react');
  logger.pending('installing nodegui dependencies');
  await npmInstall('@nodegui/nodegui');
  await npmInstall('@nodegui/react-nodegui');
  logger.pending('installing parcel dependencies');
  await npmInstallDev('parcel-bundler');
  await npmInstallDev('parcel-plugin-nodegui-stylesheets')
  await npmInstallDev('node-sass');
  logger.pending('creating boilerplate files');
  await mkdir('src');
  await writeFile('src/index.tsx', indexTsx);
  await writeFile('src/index.scss', indexScss);
  await writeFile('src/external-types.d.ts', externalTypesDTs);
  logger.pending('adding start, build scripts');
  await addScript('start', 'qode dist/index.js');
  await addScript('watch', 'parcel watch --target node src/index.tsx --out-dir dist');
  await addScript('build', 'parcel build --target node src/index.tsx --out-dir dist');
  logger.success();
}

export const tags = ['React', 'Parcel', 'NodeGUI', 'SASS'];
