const http = require('http');

class Application {
  use() {}
  listen(...args) {
    const server = http.createServer((req, res) => {
      res.end('Hello Koa');
    });
    server.listen(...args);
  }
}

module.exports = Application;