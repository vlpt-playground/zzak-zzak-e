import React, { Component, Fragment } from 'react';
import './TweetRemoveModal.scss';

class TweetRemoveModal extends Component {
  state = {
    password: '',
  };
  handleChange = e => {
    this.setState({
      password: e.target.value,
    });
  };
  handleConfirm = () => {
    const { onRemoveConfirm, needPass } = this.props;
    if (!needPass) {
      onRemoveConfirm();
      return;
    }
    onRemoveConfirm(this.state.password);
  };
  render() {
    const { needPass, error, onClose } = this.props;
    return (
      <div className="TweetRemoveModal">
        <div className="dark-area" />
        <div className="modal-wrapper">
          <div className="modal">
            <div className="title">삭제하기</div>
            <div className="description">
              {needPass ? '비밀번호를 입력하세요.' : '정말 삭제하시겠습니까?'}
            </div>
            {needPass && (
              <input
                type="password"
                placeholder="비밀번호"
                onChange={this.handleChange}
                value={this.state.password}
              />
            )}
            {error && <div className="error">잘못된 비밀번호입니다.</div>}
            <div className="buttons-wrapper">
              <button className="cancel" onClick={onClose}>
                취소
              </button>
              <button className="remove" onClick={this.handleConfirm}>
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TweetRemoveModal;
