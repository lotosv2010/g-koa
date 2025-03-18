# g-koa

仿 koa 实现

## 快速开始

```bash
npm install g-koa --save
```

## 示例

```js
const Koa = require('g-koa');
const app = new Koa();

app.use((ctx, next) => {
  console.log(ctx.path);
  console.log(ctx.method);
});

app.listen(3000, () => {
  console.log('server is running at http://127.0.0.1:3000');
});
```

## 测试

```bash
curl -H "Content-Type: application/json" -X POST -d '{"key": "value"}' http://localhost:5050\?\a\=\1\&\b\=\2
```
