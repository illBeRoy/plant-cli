import * as ora from 'ora';

const main = async () => {
  const log = ora('Getting shit together...').start();
  await new Promise(res => setTimeout(res, 1000));
  log.text = 'Almost there...';
  await new Promise(res => setTimeout(res, 1000));
  log.stopAndPersist({ symbol: '🐵', text: 'Done!' });
};

main();
