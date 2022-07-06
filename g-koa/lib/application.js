const http = require('http');

class Application {
  constructor() {
    this.middleware = [];
  }
  use(cb) {
    this.middleware.push(cb);
  }
  // 异步递归遍历调用中间件处理函数
  compose(middleware) {
    return function() {
      const dispatch = index => {
        if(index >= middleware.length) return Promise.resolve();
        const fn = middleware[index];
        return Promise.resolve(fn({}, () => dispatch(index + 1))); //! 这里是 next 函数
      };
      return dispatch(0);
    }
  }
  callback() {
    const fnMiddleware = this.compose(this.middleware);
    const handleRequest = (req, res) => {
      fnMiddleware().then(() => {
        res.end('end');
      }).catch((error) => {
        res.end(error.message);
      });
    }
    return handleRequest
  }
  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = Application;