const context = {};

function defineGetter(target, key) {
  Object.defineProperty(context, key, {
    get: function() {
      return this[target][key];
    }
  });
}

defineGetter('request', 'path');
defineGetter('request', 'query');
defineGetter('request', 'header');
defineGetter('request', 'headers');
defineGetter('request', 'method');

module.exports = context;
