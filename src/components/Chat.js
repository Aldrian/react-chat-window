import PropTypes from "prop-types";
import React, { Component } from "react";
import ChatWindow from "./ChatWindow";
import launcherIcon from "./../assets/logo-no-bg.svg";
import incomingMessageSound from "./../assets/sounds/notification.mp3";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      launcherIcon,
      isOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mute) {
      return;
    }
    const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
    const isIncoming = (nextMessage || {}).author === "them";
    const isNew = nextProps.messageList.length > this.props.messageList.length;
    if (isIncoming && isNew) {
      this.playIncomingMessageSound();
    }
  }

  playIncomingMessageSound() {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }
  render() {
    return (
      <ChatWindow
        messageList={this.props.messageList}
        onUserInputSubmit={this.props.onMessageWasSent}
        onFilesSelected={this.props.onFilesSelected}
        agentProfile={this.props.agentProfile}
        onClose={this.handleClick.bind(this)}
        showEmoji={this.props.showEmoji}
      />
    );
  }
}

Chat.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool
};

Chat.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true
};

export default Chat;
