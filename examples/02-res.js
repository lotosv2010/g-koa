// const Koa = require('koa');
const Koa = require('../lib/application');

const app = new Koa();
const port = 5050;

app.use((ctx) => {
  console.log(Object.keys(ctx));
  // ctx.res.end('hello world');
  // ctx.res.end('hello world');
  // ctx.res.end('hello world');
  ctx.body = 'hello world';
  // ctx.body = '';
  // ctx.body = null;
})

app.listen(port, () => {
  console.log(`server started port at ${port}`);
})