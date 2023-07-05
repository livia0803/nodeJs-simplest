const request = require('request');
const requestPromise = require('request-promise');

const GET = 'GET';
const POST = 'POST';
const DELETE = 'DELETE';

const APPLICATION_JSON = 'application/json';
const APPLICATION_OCTET_STREAM = 'application/octet-stream';
const mediaType = { APPLICATION_JSON, APPLICATION_OCTET_STREAM };

const getOptions = (opts = {}) => {
  const defaultOpts = {
    json: true,
    headers: {
      'content-type': APPLICATION_JSON,
      accept: APPLICATION_JSON
    }
  };

  const headers = opts.headers && { ...defaultOpts.headers, ...opts.headers };
  return { ...defaultOpts, ...opts, ...headers };
};

const req = (opts = {}) => {
  const options = getOptions(opts);
  return requestPromise(options);
};

const get = (opts = {}) => {
  opts.method = GET;
  return req(opts);
};

const getStream = (opts = {}) => {
  opts.method = GET;
  const options = getOptions(opts);
  return request(options);
};

const post = (opts = {}) => {
  opts.method = POST;
  return req(opts);
};

const postStream = (opts = {}) => {
  opts.method = POST;
  const options = getOptions(opts);
  return request(options, (err, resp, body) => {
    if (err || (resp.statusCode < 200 || resp.statusCode > 299)) {
      const error = body || {
        errorCode: resp.statusCode,
        errorMessage: 'unexpected errors'
      };
      resp.req.socket.emit('error', error);
    }
  });
};

const del = (opts = {}) => {
  opts.method = DELETE;
  return req(opts);
};

const transformLocation = (body, response) => {
  return response.headers['location'];
};

const locationParser = {
  transform: transformLocation
};

module.exports = { get, post, del, req, getStream, postStream, locationParser, mediaType };
