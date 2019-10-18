import { npmInstallDev, npx } from '../actions/npm';
import { addScript } from '../actions/packageJson';
import { addTSlintRule, initTSLint, setTSLintExtends, setTSLintRulesDirectory } from '../actions/tslint';
import { logger } from '../utils/logger';

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
  await addTSlintRule('quotemark', [true, 'single']);
  await addTSlintRule('ordered-imports', false);
  await addTSlintRule('max-line-length', false);
  await addTSlintRule('arrow-parens', false);
  await addTSlintRule('trailing-comma', false);
  await addTSlintRule('no-shadowed-variable', false);
  await addTSlintRule('object-literal-sort-keys', false);
  await addTSlintRule('member-access', false);
  await addTSlintRule('max-classes-per-file', false);
  await addTSlintRule('interface-name', false)
  await addTSlintRule('no-string-literal', false)
  await addTSlintRule('member-ordering', false)
  logger.pending('adding scripts');
  await addScript('lint', 'tslint --project tsconfig.json');
  await addScript('posttest', 'npm run lint');
  logger.pending('applying lint to project');
  await npx('tslint --fix --project tsconfig.json');
  logger.success();
};

export const tags = ['TSLint'];
