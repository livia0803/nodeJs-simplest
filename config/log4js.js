const conf = require('../src/lib/conf');
const name = conf.get('name');
const homedir = require('os').homedir();
const baseDir = `${homedir}/gac/logs/${name}`;

const log4jsConfig = {
  appenders: {
    console: { type: 'console' },
    http: {
      type: 'file',
      filename: `${baseDir}/access.log`,
      maxLogSize: 20 * 1024 * 1024,
      compress: true
    },
    app: {
      type: 'file',
      filename: `${baseDir}/app.log`,
      compress: true,
      maxLogSize: 20 * 1024 * 1024
    },
    debug: {
      type: 'dateFile',
      filename: `${baseDir}/debug.log`,
      pattern: '.yyyy-MM-dd',
      compress: true,
      numBackups: 3
    },
    appInfo: {
      type: 'logLevelFilter',
      appender: 'app',
      level: 'info'
    }
  },
  categories: {
    default: {
      appenders: ['console', 'appInfo', 'debug'],
      level: 'all'
    },
    http: { appenders: ['http'], level: 'info' }
  }
};

module.exports = log4jsConfig;
