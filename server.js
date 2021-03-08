const Koa = require('./lib/application')
// const Koa = require('koa')
const app = new Koa()
const logger = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('logger')
      resolve()
    }, 3000)
  })
}
app.use(async (ctx, next) => {
  console.time('start')
  console.log(1)
  await next()
  await logger()
  console.log(2)
  ctx.body = 'welcome node !'
  console.timeEnd('start')
})
app.use(async (ctx, next) => {
  console.log(3)
  await next()
  console.log(4)
  ctx.body = 'welcome node !!'
})
app.use(async (ctx, next) => {
  console.log(5)
  await next()
  console.log(6)
  ctx.body = 'welcome node !!!'
})
app.on('error', (error) => {
  console.log(error)
})

// koa的中间件原理：
//  会将所有的中间件组合成一个大的promise，当这个promise执行完毕后，会采用当前的ctx.body 进行结果的响应
//  next 前面必须有await或者return否则执行顺序可能达不到预期
//  如果都是同步执行，加不加await都无所谓，我不知道后续是否有异步逻辑，所以写的时候都要加 await
//  next():
//    1.可以把多个模块通过next方法来链接起来
//    2.可以决定是否向下执行(可以实现后台权限)
//    3.可以封装一些方法在中间件中，封装后向下执行
app.listen(3000, () => {
  console.log(`server started port at 3000`)
})
