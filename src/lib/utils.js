const _ = require('lodash');
const { gzip, ungzip } = require('node-gzip');
const fs = require('fs');

const conf = require('./conf');
const http = require('./httpUtils');

const getContextRoot = () => {
  const ctx = conf.get('context') || '/';
  return (ctx.startsWith('/') && ctx) || `/${ctx}`;
};

const eq = (a, b, ...props) => {
  let keys = props;
  if (_.isEmpty(props)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    keys = Object.keys(a);
  }
  return keys.every(k => a[k] === b[k]);
};

const isCompressed = o => o.content && o.isCompressed;

const compress = o => {
  if (!isCompressed(o)) {
    const s = JSON.stringify(o, null, '  ');
    return gzip(s)
      .then(b => Buffer.from(b).toString('base64'))
      .then(content => ({ isCompressed: true, content }));
  }
  return Promise.resolve(o);
};

const decompress = o => {
  if (o.content && o.isCompressed) {
    const buf = Buffer.from(o.content, 'base64');
    return ungzip(buf)
      .then(b => b.toString('ascii'))
      .then(s => JSON.parse(s));
  }
  return Promise.resolve(o);
};



const groupTimeWithGroup = (dateTime, timeGroup) => dateTime.substring(0, dateTime.length - timeGroup.length) + timeGroup;

const fileStream = filePath => fs.createReadStream(filePath);

const urlStream = (uri, opts = {}) => {
  const { body = {}, ...o } = opts;
  const { APPLICATION_JSON, APPLICATION_OCTET_STREAM } = http.mediaType;
  const headers = { accept: [APPLICATION_JSON, APPLICATION_OCTET_STREAM].join(',') };
  return http.postStream({ uri, body, ...o, headers });
};




module.exports = {
  getContextRoot,
  eq,
  compress,
  decompress,
  fileStream,
  urlStream,
};