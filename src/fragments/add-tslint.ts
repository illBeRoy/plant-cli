import { logger } from '../utils/logger';
import { npmInstallDev } from '../actions/npm';
import { initTSLint, setTSLintExtends, setTSLintRulesDirectory, addTSlintRule } from '../actions/tslint';
import { addScript } from '../actions/packageJson';

export const addTSLint = async () => {
  logger.context('TSLint');
  logger.pending('installing dependencies');
  await npmInstallDev('tslint');
  await npmInstallDev('tslint-eslint-rules');
  logger.pending('creating configuration');
  await initTSLint();
  await setTSLintExtends('tslint:recommended');
  await setTSLintRulesDirectory('node_modules/tslint-eslint-rules/dist/rules');
  await addTSlintRule('object-curly-spacing', true);
  await addTSlintRule('quotemark', [true, "single"]);
  await addTSlintRule('ordered-imports', false);
  logger.pending('adding scripts');
  await addScript('lint', 'tslint --project tsconfig.json');
  await addScript('posttest', 'npm run lint');
  logger.success();
};
