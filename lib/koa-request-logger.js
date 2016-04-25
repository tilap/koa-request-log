'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var shortid = require('shortid');
var assert = require('assert');

var defaultFormat = function defaultFormat(ctx, id) {
  var isIn = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
  var timeDiff = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
  return isIn ? '[' + id + '  IN] ' + ctx.request.method + ' ' + ctx.request.url : '[' + id + ' OUT] ' + ctx.request.method + ' ' + ctx.request.url + ' [' + ctx.status + '] ' + timeDiff + 'ms';
};

module.exports = function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$logger = _ref.logger;
  var logger = _ref$logger === undefined ? console : _ref$logger;
  var _ref$method = _ref.method;
  var method = _ref$method === undefined ? 'log' : _ref$method;
  var _ref$format = _ref.format;
  var format = _ref$format === undefined ? defaultFormat : _ref$format;

  assert(logger.hasOwnProperty(method), new Error('Logger does not have the method "${method}"'));
  return function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var start, id;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              start = Date.now();
              id = shortid.generate();

              logger[method](format(ctx, id, true));
              _context.next = 5;
              return next();

            case 5:
              logger[method](format(ctx, id, false, new Date() - start));

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x4, _x5) {
      return ref.apply(this, arguments);
    };
  }();
};