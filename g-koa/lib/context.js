const delegate = require('delegates');

const context = {};

// function defineProperty(target, name) {
//   Object.defineProperty(context, name, {
//     get() {
//       return this[target][name];
//     }
//   });
// }

// function defineProperty(target, name) {
//   //? https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__
//   context.__defineGetter__(name, function() {
//     return this[target][name];
//   });
// }

// defineProperty('request', 'method');
// defineProperty('request', 'url');


delegate(context, 'request')
  .access('url')
  .access('path')
  .access('header')
  .access('headers')
  .access('method')
  .access('query')
delegate(context, 'response')
  .access('body')


module.exports = context;