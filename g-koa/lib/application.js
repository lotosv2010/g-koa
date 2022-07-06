const http = require('http');

const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application {
  constructor() {
    this.middleware = [];
    // 防止多个实例共享
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  use(cb) {
    this.middleware.push(cb);
  }
  // 异步递归遍历调用中间件处理函数
  compose(middleware) {
    return function(context) {
      const dispatch = index => {
        if(index >= middleware.length) return Promise.resolve();
        const fn = middleware[index];
        return Promise.resolve(fn(context, () => dispatch(index + 1))); //! 这里是 next 函数
      };
      return dispatch(0);
    }
  }
  // 构造上下文对象
  createContext(req, res) {
    // 每次请求都创建一个全新的上下文
    const response = Object.create(this.response);
    const request = Object.create(this.request);
    const context = Object.create(this.context);
    // 上下文中有一个 request 对象，是自己封装的对象
    context.request = request;
    // 上下文中还有一个 req 属性，是自原生的req
    // 自己封装的 request 对象上有 req 属性
    context.request.req = context.req = req;
    context.response = response;
    context.response.res = context.res = res;
    return context;
  }
  callback() {
    const fnMiddleware = this.compose(this.middleware);
    const handleRequest = (req, res) => {
      // 每个请求都会创建一个独立的 context 上下文对象
      // 它们之间不会互相污染
      const context = this.createContext(req, res);
      fnMiddleware(context).then(() => {
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