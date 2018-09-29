"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _actions = require("./actions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterWrapper = function (_PureComponent) {
  _inherits(RouterWrapper, _PureComponent);

  function RouterWrapper(props) {
    _classCallCheck(this, RouterWrapper);

    var _this = _possibleConstructorReturn(this, (RouterWrapper.__proto__ || Object.getPrototypeOf(RouterWrapper)).call(this, props));

    _actions.actions.routing = props.history;
    return _this;
  }

  _createClass(RouterWrapper, [{
    key: "render",
    value: function render() {
      var children = this.props.children;

      return children;
    }
  }]);

  return RouterWrapper;
}(_react.PureComponent);

exports.default = (0, _reactRouterDom.withRouter)(RouterWrapper);