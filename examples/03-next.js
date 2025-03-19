// const Koa = require('koa');
const Koa = require('../lib/application');

const app = new Koa();
const port = 5050;

// 1)这里每个use中的方法都是promise，这些promise会被组合成一个promise, 如果外层的promise没有等待里层的，则直接就结束了
// 2)所有的异步逻辑都要写成promise
// 3)所有next方法前面 必须+return 或者 await

app.use(async (ctx, next) => {
  // throw new Error('error 123456');
  console.log(1)
  // ctx.res.end('hello world');
  ctx.body = 'hello world';
  // ctx.body = '';
  // ctx.body = null;
  // await next(); // 两次掉用next
  await next();
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  ctx.body = 'hello world 2';
  await next();
  console.log(4)
})

app.use(async (ctx, next) => {
  console.log(5)
  ctx.body = 'hello world 3';
  await next();
  console.log(6)
})

app.on('error', (err, ctx) => {
  console.log(err, 'app.on error');
  ctx.body = 'error';
})

app.listen(port, () => {
  console.log(`server started port at ${port}`);
})