"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var middlewares = [];
  return function (middleware) {
    if (middleware) {
      middlewares.push(middleware);
    }
    return middlewares;
  };
}();