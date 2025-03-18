const parseURL = (url) => {
  return new URL(url, 'http://localhost');
}

const request = {
  get url() {
    return new URL(this.req.url, 'http://localhost');
  },
  get path() {
    return this.url.pathname;
  },
  get query() {
    const query = {};
    for (const [key, value] of this.url.searchParams) {
      query[key] = value;
    }
    return query;
  },
  get headers() {
    return this.req.headers;
  },
  get header() {
    return this.req.headers;
  },
  get method() {
    return this.req.method;
  },
};

module.exports = request;