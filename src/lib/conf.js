const nconf = require('nconf');

nconf.file('./config/app.json');
nconf.add('clients', { type: 'file', file: './config/clients.json' });
nconf.add('pkg', { type: 'file', file: './package.json' });

const get = (...keys) => {
  if (keys.length === 1) {
    return nconf.get(keys[0]);
  }
  return keys.reduce((v, k) => ((v[k] = nconf.get(k)), v), {});
};

module.exports = { get };
