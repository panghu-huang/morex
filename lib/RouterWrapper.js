"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterWrapper = function (_PureComponent) {
  (0, _inherits3.default)(RouterWrapper, _PureComponent);

  function RouterWrapper(props) {
    (0, _classCallCheck3.default)(this, RouterWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RouterWrapper.__proto__ || (0, _getPrototypeOf2.default)(RouterWrapper)).call(this, props));

    _actions.actions.routing = props.history;
    return _this;
  }

  (0, _createClass3.default)(RouterWrapper, [{
    key: "render",
    value: function render() {
      var children = this.props.children;

      return children;
    }
  }]);
  return RouterWrapper;
}(_react.PureComponent);

exports.default = (0, _reactRouterDom.withRouter)(RouterWrapper);