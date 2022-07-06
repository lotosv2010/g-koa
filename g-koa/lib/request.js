const url = require('url');

const request = {
  get url() {
    // this -> context.request
    return this.req.url;
  },
  get path() {
    return url.parse(this.req.url).pathname;
  },
  get query() {
    return url.parse(this.req.url, true).query;
  },
  get method() {
    return this.req.method;
  },
  get header() {
    return this.req.headers;
  },
  get headers() {
    return this.req.headers;
  }
};

module.exports = request;