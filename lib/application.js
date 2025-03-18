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
    const context= Object.create(this.context);

    // 原生
    context.req = req;
    context.res = res;
    // 扩展
    context.request = request;
    context.response = response;
    context.request.req = req;
    context.response.res = res;
    return context;
  }
  handleRequest = (req, res) => {
    const ctx = this.createContext(req, res);
    this.middleware(ctx);
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