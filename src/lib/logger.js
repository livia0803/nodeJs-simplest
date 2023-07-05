const log4js = require('log4js');
const log4js_extend = require("log4js-extend");
const path = require('path');
const log4jsConfig = require('../../config/log4js');

log4js.configure(log4jsConfig);

const rootPath = path.dirname(require.main.filename);
log4js_extend(log4js, {
  path: rootPath,
  format: "at @name (@file:@line:@column)"
});

const getLogger = category => log4js.getLogger(category);

const connect = (category, opts) => (req, res, next) => (
  log4js.connectLogger(getLogger(category), opts)(req, res, next)
);

module.exports = { getLogger, connect };
