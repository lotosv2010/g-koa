const Koa = require('koa');
// const Koa = require('../lib/application');
const { createReadStream } = require('fs');
const path = require('path');

const bodyParser = require('../middleware/body-parser');

const app = new Koa();

//1)编写koa的时候所有的异步方法都要写成promise，所有next前面都要+await
//2)中间件的执行过程 use，默认从上到下执行的

// 中间件，处理公共逻辑
// 决定是否有权限继续执行
app.use(bodyParser({
  uploadDir: path.join(__dirname, '..','upload')
}));

app.use(async (ctx, next) => {
  if(ctx.path === '/login' && ctx.method === 'GET') {
    // ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.res.setHeader('Content-Type', 'text/html;charset=utf-8');
    // ctx.type = 'text/html;charset=utf-8';
    ctx.body = createReadStream(path.join(__dirname, '..','public', 'login.html'));
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.path === '/login' && ctx.method === 'POST') {
    ctx.body = ctx.request.body;
  } else {
    await next();
  }
});

app.on('error', (err) => {
  console.log(err);
})


app.listen(5050, () => {
  console.log('server started port at 5050');
});