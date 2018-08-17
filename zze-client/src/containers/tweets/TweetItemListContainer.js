import React, { Component, Fragment } from 'react';
import TweetItemList from 'components/tweets/TweetItemList';
import * as tweetActions from 'store/modules/tweets';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from 'components/common/Loading';
import throttle from 'lodash/throttle';

const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

const getScrollBottom = () => {
  if (!document.body) return 0;
  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
};

class TweetItemListContainer extends Component {
  lastCursor = null;

  initialize = () => {
    const { TweetActions } = this.props;
    TweetActions.getInitial();
  };

  componentDidMount() {
    this.initialize();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  getNext = () => {
    const { TweetActions, lastId, loadingNext, end } = this.props;
    if (loadingNext || end || this.lastCursor === lastId) return;
    TweetActions.getNext({ cursor: lastId });
    this.lastCursor = lastId;
  };

  handleScroll = throttle(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom < 350) {
      this.getNext();
    }
  }, 250);

  handleOpenRemoveModal = (id) => {
    const { TweetActions } = this.props;
    TweetActions.openRemoveModal(id);
  }

  render() {
    const { list, loadingRecent, loadingNext } = this.props;

    if (!list) {
      return <Loading />;
    }

    return (
      <Fragment>
        {loadingRecent && <Loading />}
        <TweetItemList tweets={list} onRemove={this.handleOpenRemoveModal}/>
        {loadingNext && <Loading />}
      </Fragment>
    );
  }
}

export default connect(
  ({ tweets, pender }) => ({
    list: tweets.list,
    firstId: tweets.list && tweets.list[0] && tweets.list[0]._id,
    lastId:
      tweets.list &&
      tweets.list[tweets.list.length - 1] &&
      tweets.list[tweets.list.length - 1]._id,
    loadingRecent:
      pender.pending['tweets/GET_RECENT'] ||
      pender.pending['write/WRITE_TWEET'],
    loadingNext: pender.pending['tweets/GET_NEXT'],
    end: tweets.end,
  }),
  dispatch => ({
    TweetActions: bindActionCreators(tweetActions, dispatch),
  })
)(TweetItemListContainer);
