import React, { Component } from 'react';
import './TweetWrite.scss';

class TweetWrite extends Component {
  textareaRef = React.createRef();

  handleButtonClick = () => {
    this.textareaRef.current.focus();
    this.props.onWrite();
  };

  handleKeyUp = e => {
    if (e.ctrlKey && e.keyCode === 13) {
      this.handleButtonClick();
    }
  };

  render() {
    const { fields, onChange, logged } = this.props;
    const { name, password, text } = fields;

    return (
      <div className="TweetWrite">
        <textarea
          ref={this.textareaRef}
          value={text}
          onChange={onChange}
          onKeyUp={this.handleKeyUp}
          name="text"
          placeholder="무슨 생각을 하고 계신가요?"
        />
        <div className="wrapper">
          {!logged && (
            <div className="inputs">
              <input
                value={name}
                onChange={onChange}
                name="name"
                placeholder="이름"
              />
              <input
                value={password}
                onChange={onChange}
                name="password"
                type="password"
                placeholder="비밀번호"
              />
            </div>
          )}
          <button
            disabled={text === '' || (!logged && password.length < 6)}
            onClick={this.handleButtonClick}
          >
            작성
          </button>
        </div>
      </div>
    );
  }
}

export default TweetWrite;
