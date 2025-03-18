const context = {};

function defineSetter(target, key) {
  Object.defineProperty(context, key, {
    set: function(value) {
      this[target][key] = value;
    },
    configurable: true,
  });
}


function defineGetter(target, key) {
  Object.defineProperty(context, key, {
    get: function() {
      return this[target][key];
    },
    configurable: true,
  });
}


defineGetter('request', 'path');
defineGetter('request', 'query');
defineGetter('request', 'header');
defineGetter('request', 'headers');
defineGetter('request', 'method');
defineGetter('response', 'body');

// ctx.body --> ctx.response.body
defineSetter('response', 'body');

module.exports = context;
