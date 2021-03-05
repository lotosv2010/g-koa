const EventEmitter = require('events')
const http = require('http')

const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application extends EventEmitter {
  constructor() {
    super()
    // 防止多个实例共享
    this.response = Object.create(response)
    this.request = Object.create(request)
    this.context = Object.create(context)
  }
  use(callback) {
    this.callback = callback
  }
  createContext(req, res) {
    // 每次请求都创建一个全新的上下文
    const response = Object.create(this.response)
    const request = Object.create(this.request)
    const context = Object.create(this.context)
    // 上下文中有一个 request 对象，是自己封装的对象
    context.request = request
    // 上下文中还有一个 req 属性，是自原生的req
    // 自己封装的 request 对象上有 req 属性
    context.request.req = context.req = req
    context.response = response
    context.response.res = context.res = res
    return context
  }
  handleRequest(req, res) {
    // 创建一个上下文
    const ctx = this.createContext(req, res)
    this.callback(ctx)
    return res.end(ctx.body)
  }
  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}
module.exports = Application