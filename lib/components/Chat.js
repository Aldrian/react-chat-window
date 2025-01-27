"use strict";

exports.__esModule = true;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ChatWindow = require("./ChatWindow");

var _ChatWindow2 = _interopRequireDefault(_ChatWindow);

var _logoNoBg = require("./../assets/logo-no-bg.svg");

var _logoNoBg2 = _interopRequireDefault(_logoNoBg);

var _notification = require("./../assets/sounds/notification.mp3");

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chat = function (_Component) {
  _inherits(Chat, _Component);

  function Chat() {
    _classCallCheck(this, Chat);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      launcherIcon: _logoNoBg2.default,
      isOpen: false
    };
    return _this;
  }

  Chat.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.mute) {
      return;
    }
    var nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
    var isIncoming = (nextMessage || {}).author === "them";
    var isNew = nextProps.messageList.length > this.props.messageList.length;
    if (isIncoming && isNew) {
      this.playIncomingMessageSound();
    }
  };

  Chat.prototype.playIncomingMessageSound = function playIncomingMessageSound() {
    var audio = new Audio(_notification2.default);
    audio.play();
  };

  Chat.prototype.handleClick = function handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  };

  Chat.prototype.render = function render() {
    return _react2.default.createElement(_ChatWindow2.default, {
      messageList: this.props.messageList,
      onUserInputSubmit: this.props.onMessageWasSent,
      onFilesSelected: this.props.onFilesSelected,
      agentProfile: this.props.agentProfile,
      onClose: this.handleClick.bind(this),
      showEmoji: this.props.showEmoji,
      height: this.props.height
    });
  };

  return Chat;
}(_react.Component);

Chat.propTypes = process.env.NODE_ENV !== "production" ? {
  onMessageWasReceived: _propTypes2.default.func,
  onMessageWasSent: _propTypes2.default.func,
  newMessagesCount: _propTypes2.default.number,
  isOpen: _propTypes2.default.bool,
  handleClick: _propTypes2.default.func,
  messageList: _propTypes2.default.arrayOf(_propTypes2.default.object),
  mute: _propTypes2.default.bool,
  showEmoji: _propTypes2.default.bool
} : {};

Chat.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true
};

exports.default = Chat;
module.exports = exports["default"];