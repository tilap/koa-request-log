# Koa request logger

Simple middleware **for Koa 2** to log in and out request, with diff time, and custom logger.

## Install

```
npm install --save koa-request-logger
```

## Usage

```
const Koa = require('Koa');
const koaRequestLogger = require('koa-request-logger');

const app = new Koa();
app.use(koaRequestLogger());

app.listen(3000);
```

## Options

You can customize :

- ```logger```, the logger object, by default ```console```
- ```method```, the logger method, by default ```log```
- ```format```, the output format function for IN and OUT request which takes params:
  - ```ctx```: the koa context of the request
  - ```id```: an unique ID to match in/out with easy
  - ```isIn```: true if IN request, else false,
  - ```timeDiff```: diff time for OUT requests (null for IN requests)

### Example with winston as logger and custom log format

```
const Koa = require('Koa');
const koaRequestLogger = require('koa-request-logger');
const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'somefile.log' })
  ]
});

const app = new Koa();
app.use(koaRequestLogger({
  logger,
  method: 'info',
  format: (ctx, id, isIn = true, timeDiff = null) => (isIn ?
    `Incoming request #${id}: method ${ctx.request.method}, url ${ctx.request.url}` :
    `Sending request results #${id}: method ${ctx.request.method}, url ${ctx.request.url}, status: ${ctx.status}, duration: ${timeDiff}ms`);
}));

app.listen(3000);
```

## License

MIT
