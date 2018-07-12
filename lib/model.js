"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var models = [];
  return function (model) {
    if (model) {
      models.push(model);
    }
    return models;
  };
}();