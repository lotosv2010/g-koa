const Koa = require('koa');
const path = require('path');
// const server = require('koa-static');
const server = require('../middleware/static');
const Router = require('../middleware/Router');

const app = new Koa();

const router = new Router();

router.get('/login', (ctx, next) => {
  ctx.type = 'text/html;charset=utf-8'
  ctx.body = 'login';
})

router.post('/login', (ctx, next) => {
  ctx.type = 'application/json;charset=utf-8'
  ctx.body = {
    code: 0,
    msg: 'success'
  };
})

app.use(server(path.join(__dirname, '..', 'public')));
app.use(server(__dirname));

app.use(router.routes());

app.on('error', (err) => {
  console.log(err);
})


app.listen(5050, () => {
  console.log('server started port at 5050');
});