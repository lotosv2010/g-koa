const parse = require('parseurl')
const request = {
  get url() {
    // this -> context.request
    return this.req.url
  },
  get path() {
    return parse(this.req).path
  }
}
module.exports = request