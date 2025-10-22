//@ts-check

const config = require('./config');

const levels = /**@type {any}*/ ({ error: 0, warn: 1, info: 2, debug: 3 });

class Logger {
  constructor(level = 'info') {
    this.level = level;
  }

  /**
   * @param {string} level
   */
  setLevel(level) {
    this.level = level;
  }

  /**
   * @param {'debug'|'info'|'warn'|'error'} level
   * @param {string[]} args
   */
  log(level, ...args) {
    if (levels[level] <= levels[this.level]) {
      console[level](...args);
    }
  }

  /**
   * @param {string[]} args
   */
  error(...args) {
    this.log('error', ...args);
  }
  /**
   * @param {string[]} args
   */
  warn(...args) {
    this.log('warn', ...args);
  }
  /**
   * @param {string[]} args
   */
  info(...args) {
    this.log('info', ...args);
  }
  /**
   * @param {string[]} args
   */
  debug(...args) {
    this.log('debug', ...args);
  }
}

module.exports = new Logger(config.lambdaLogLevel || 'info');

