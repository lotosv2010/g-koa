var delegate = require('delegates')
const proto = {}
delegate(proto, 'request')
  .access('url')
  .access('path')

delegate(proto, 'response')
  .access('body')
module.exports = proto