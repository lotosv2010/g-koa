const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

Buffer.prototype.split = function(boundary) {
  const arr = [];

  let offset = 0;
  let currentBoundaryPosition = 0;
  
  while(-1 !== (currentBoundaryPosition = this.indexOf(boundary, offset))) {
    arr.push(this.slice(offset, currentBoundaryPosition));
    offset = currentBoundaryPosition + boundary.length;
  }
  arr.push(this.slice(offset));
  
  return arr;
}

function bodyParser({ uploadDir }) {
  return async (ctx, next) => {
    function parserBody(body, resolve) {
      const contentType = ctx.get('Content-Type');
      if (contentType.includes('application/json')) {
        resolve(JSON.parse(body));
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const obj = {}
        new URLSearchParams(body || '{}').forEach((value, key) => {
          obj[key] = value;
        });
        resolve(obj);
      } else if(contentType.includes('multipart/form-data')) {
        const boundary =  '--' + contentType.split('=')[1];
        const lines = body.split(boundary).slice(1, -1);

        const result = {};
        lines.forEach(async line => {
          let [header, body] = line.split('\r\n\r\n');
          const key = header.toString().match(/name="(.+?)"/)[1];
          if(header.includes('filename')) {
            const filename = uuid.v4();
            const content = line.slice(header.length + 4, -2);
            const filePathName = path.join(uploadDir, filename);
            fs.writeFileSync(filePathName, content);
            result[key] = {
              filename: filePathName,
              originalFilename: header.toString().match(/filename="(.+?)"/)[1],
              size: content.length
            }
          } else {
            result[key] = body.toString().slice(0, -2);
          }
        });
        resolve(result);
      } else {
        resolve(body);
      }
    }

    if (ctx.method === 'POST') {
      const body = await new Promise((resolve, reject) => {
        let chunks = [];
        ctx.req.on('data', (chunk) => {
          chunks.push(chunk);
        });
        ctx.req.on('end', () => {
          const bodyStr = Buffer.concat(chunks).toString();
          parserBody(bodyStr, resolve)
        });
      });
      ctx.request.body = body;
    }
    await next(); // 用await也可以
  }
}

module.exports = bodyParser;