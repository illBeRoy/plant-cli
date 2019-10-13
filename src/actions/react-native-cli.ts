import { npx } from './npm';

export const reactNativeInit = async (projectName: string) => {
  await npx(`react-native init --npm --template react-native-template-typescript ${projectName}`);
};
