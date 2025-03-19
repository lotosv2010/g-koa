const fs = require('fs').promises;
const { createReadStream } = require('fs');
const path = require('path');
const mime = require('mime')

function server(_dirname) {
  return async (ctx, next) => {
    try {
      const filepath = path.join(_dirname, ctx.path);
      const stat = await fs.stat(filepath);
      if(stat.isFile()) {
        const type = `${mime.getType(filepath) || 'text/plain'};charset=utf-8`;
        // ctx.type = type;
        ctx.set('Content-Type', type);
        ctx.body = createReadStream(filepath);
      } else {
        return next();
      }
    } catch (error) {
      return next();
    }
  }
}

module.exports = server;