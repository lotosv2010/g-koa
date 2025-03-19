const delegates = require('delegates');

const context = {};

delegates(context, 'request')
  .access('query')
  .access('path')
  .access('header')
  .access('headers')
  .access('method')
  .getter('body');

  delegates(context, 'response')
  .method('end')
  .access('body')
  .getter('status')
  .setter('status');

module.exports = context;
