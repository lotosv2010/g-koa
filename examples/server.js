const fs = require('fs');
const Koa = require('../g-koa');

const app = new Koa();

const one = (ctx, next) => {
  console.log('one >>>');
  next();
  console.log('<<< one');
}

const two = (ctx, next) => {
  console.log('two >>>');
  next();
  console.log('<<< two');
}

const three = (ctx, next) => {
  console.log('three >>>');
  next();
  console.log('<<< three');
}

app.use(one);
app.use(two);
app.use(three);

app.use(async (ctx, next) => {
  const obj = {
    name: 'test1',
    age: 18
  }
  // console.log(ctx.request.header);
  // console.log(ctx.request.headers);
  // console.log(ctx.request.method);
  // console.log(ctx.request.url);
  // console.log(ctx.request.path);
  // console.log(ctx.request.query);

  // console.log(ctx.header);
  // console.log(ctx.headers);
  // console.log(ctx.method);
  // console.log(ctx.url);
  // console.log(ctx.path);
  // console.log(ctx.query);

  // ctx.body = fs.createReadStream('./README.md')
  // ctx.body = null;
  ctx.body = obj;
});

// app.on('error', (error) => {
//   console.log(error)
// });

// koa的中间件原理：
//  会将所有的中间件组合成一个大的promise，当这个promise执行完毕后，会采用当前的ctx.body 进行结果的响应
//  next 前面必须有await或者return否则执行顺序可能达不到预期
//  如果都是同步执行，加不加await都无所谓，我不知道后续是否有异步逻辑，所以写的时候都要加 await
//  next():
//    1.可以把多个模块通过next方法来链接起来
//    2.可以决定是否向下执行(可以实现后台权限)
//    3.可以封装一些方法在中间件中，封装后向下执行
app.listen(3000, () => {
  console.log(`server started port at 3000`);
});
