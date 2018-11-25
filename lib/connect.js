'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Provider = require('./Provider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = function connect() {
  var mapStateToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (store) {
    return store;
  };

  return function (WappedComponent) {
    return function (_Component) {
      (0, _inherits3.default)(Wrapper, _Component);

      function Wrapper(props) {
        (0, _classCallCheck3.default)(this, Wrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Wrapper.__proto__ || (0, _getPrototypeOf2.default)(Wrapper)).call(this, props));

        _this.renderContent = _this.renderContent.bind(_this);
        return _this;
      }

      (0, _createClass3.default)(Wrapper, [{
        key: 'renderContent',
        value: function renderContent(store) {
          var originProps = this.props;
          var props = mapStateToProps(store, originProps);
          if ('object' !== (typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props))) {
            throw new Error('返回值应该是 Object 类型');
          }
          return _react2.default.createElement(WappedComponent, (0, _extends3.default)({}, originProps, props));
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            _Provider.Consumer,
            null,
            this.renderContent
          );
        }
      }]);
      return Wrapper;
    }(_react.Component);
  };
};

exports.default = connect;