// const Koa = require('koa');
const Koa = require('../lib/application');

const app = new Koa();
const port = 5050;

app.use((ctx) => {
  console.log(ctx.path)
  console.log(ctx.query)
  console.log(ctx.headers)
  console.log(ctx.method);
  ctx.body = 'Hello World';
})

app.listen(port, () => {
  console.log(`server started port at ${port}`);
})