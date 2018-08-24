import React, { Component } from 'react';
import TweetRemoveModal from 'components/tweets/TweetRemoveModal';
import { connect } from 'react-redux';
import { closeRemoveModal, remove } from 'store/modules/tweets';

class TweetRemoveModalContainer extends Component {
  handleClose = () => {
    const { closeRemoveModal } = this.props;
    closeRemoveModal();
  };
  handleRemoveConfirm = async pass => {
    console.log(pass);
    const { remove, closeRemoveModal } = this.props;
    try {
      await remove({
        id: this.props.id,
        pass,
      });
      closeRemoveModal();
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { open, error, needPass } = this.props;
    if (!open) return null;
    return (
      <TweetRemoveModal
        onClose={this.handleClose}
        onRemoveConfirm={this.handleRemoveConfirm}
        error={error}
        needPass={needPass}
      />
    );
  }
}

export default connect(
  ({ tweets }) => ({
    open: tweets.removeModal.open,
    error: tweets.removeModal.error,
    id: tweets.removeModal.id,
    needPass: tweets.removeModal.needPass,
  }),
  {
    closeRemoveModal,
    remove,
  }
)(TweetRemoveModalContainer);
