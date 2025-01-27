import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'


class ChatWindow extends Component {
    constructor(props) {
      super(props);
    }

    onUserInputSubmit(message) {
      this.props.onUserInputSubmit(message);
    }

    onFilesSelected(filesList) {
      this.props.onFilesSelected(filesList);
    }

    render() {
      let messageList = this.props.messageList || [];
      let classList = [
        "sc-chat-window",
        "opened"
      ];
      return (
        <div className={classList.join(' ')} style={{height: this.props.height}}>
          <Header
            teamName={this.props.agentProfile.teamName}
            imageUrl={this.props.agentProfile.imageUrl}
            onClose={this.props.onClose}
          />
          <MessageList
            messages={messageList}
            imageUrl={this.props.agentProfile.imageUrl}
          />
          <UserInput
            onSubmit={this.onUserInputSubmit.bind(this)}
            onFilesSelected={this.onFilesSelected.bind(this)}
            showEmoji={this.props.showEmoji}
          />
        </div>
      );
    }
}

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool
}

export default ChatWindow;
