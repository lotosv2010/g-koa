const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application {
  constructor() {
    this.middleware = null;
    // 应用级别的隔离
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  createContext = (req, res) => {
    // 请求级别的隔离
    // 每次请求都创建一个全新的上下文
    const response = Object.create(this.response);
    const request = Object.create(this.request);
    const ctx= Object.create(this.context);

    request.response = response;
    response.request = request;

    // 扩展
    ctx.request = request;
    ctx.response = response;

    // 原生
    ctx.req = ctx.request.req = ctx.response.req = req;
    ctx.res = ctx.response.res = ctx.request.res = res;

    ctx.app = this;

    return ctx;
  }
  handleRequest = (req, res) => {
    const ctx = this.createContext(req, res);
    res.statusCode = 404;
    this.middleware(ctx);

    const body = ctx.body;
    if(typeof body === 'string' || Buffer.isBuffer(body)) {
      res.end(body);
    } else {
      res.end('Not Found');
    }
  }
  use = (handleRequest) => {
    this.middleware = handleRequest;
  }
  listen = (...args) => {
    const server = http.createServer(this.handleRequest);
    server.listen(...args);
  }
}

module.exports = Application;