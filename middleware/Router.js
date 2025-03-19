class Router {
  constructor() {
    this.stack = [];
  }
  compose(layers, ctx, next) {
    const dispatch = index => {
      if(index >= layers.length) return Promise.resolve();
      const layer = layers[index];
      return Promise.resolve(layer.handler(ctx, () => dispatch(index + 1)));
    }
    return dispatch(0);
  }
  routes() {
    return async (ctx, next) => {
      const { path, method } = ctx;
      const stack = this.stack.filter(layer => {
        return layer.method === method.toLocaleLowerCase() && layer.path === path;
      });
      this.compose(stack, ctx, next);
    }
  }
}

class Layer {
  constructor(path, method, handler) {
    this.path = path;
    this.method = method;
    this.handler = handler;
  }
}

['get', 'post', 'put', 'delate'].forEach(method => {
  Router.prototype[method] = function (path, handler) {
    this.stack.push(new Layer(path, method, handler));
  }
})

module.exports = Router;