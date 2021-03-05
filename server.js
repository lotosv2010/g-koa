const Koa = require('./lib/application')
const app = new Koa()
app.use((ctx, next) => {
  console.log(ctx.req.path)
  console.log(ctx.request.req.path)

  console.log(ctx.request.path)
  console.log(ctx.path)
  ctx.body = 'welcome node !!!'
})
app.on('error', (error) => {
  console.log(error)
})
app.listen(3000, () => {
  console.log(`server started port at 3000`)
})