import * as ora from 'ora';

class Logger {
  private logger: any = ora();
  private contextPrefix: string;

  context(prefix?: string) {
    this.logger = ora();
    this.contextPrefix = prefix;
    return this;
  }

  pending(text: string) {
    this.logger.text = this.formatText(text);
    if (!this.logger.isSpinning) {
      this.logger.start();
    }
    return this;
  }

  info(text: string) {
    this.logger.info().text = this.formatText(text);
    return this;
  }

  success(text = 'success') {
    this.logger.succeed(this.formatText(text));
    return this;
  }

  fail(text = 'failed') {
    this.logger.fail(this.formatText(text));
    return this;
  }

  global() {
    return this.context();
  }

  private formatText(text: string) {
    return `${this.contextPrefix ? `[${this.contextPrefix}] ` : ''}${text}`;
  }
}

export const logger = new Logger();
