const shortid = require('shortid');
const assert = require('assert');

const defaultFormat = (ctx, id, isIn = true, timeDiff = null) => (isIn ?
  `[${id}  IN] ${ctx.request.method} ${ctx.request.url}` :
  `[${id} OUT] ${ctx.request.method} ${ctx.request.url} [${ctx.status}] ${timeDiff}ms`);

module.exports = ({ logger = console, method = 'log', format = defaultFormat } = {}) => {
  assert(logger.hasOwnProperty(method), new Error('Logger does not have the method "${method}"'));
  return async (ctx, next) => {
    const start = Date.now();
    const id = shortid.generate();
    let msg = format(ctx, id, true);
    if (msg) {
      logger[method](msg);
    }
    await next();
    msg = format(ctx, id, false, new Date - start);
    if (msg) {
      logger[method](msg);
    }
  };
};
