import React, { Component } from 'react';
import TweetWrite from 'components/tweets/TweetWrite';
import { connect } from 'react-redux';
import { changeInput, writeTweet } from 'store/modules/write';
import { getRecent } from 'store/modules/tweets';

class TweetWriteContainer extends Component {
  handleChange = e => {
    const { changeInput } = this.props;
    const { name, value } = e.target;
    changeInput({
      field: name,
      value,
    });
  };

  handleWrite = async () => {
    const { fields, changeInput, writeTweet, getRecent } = this.props;
    const { name, password, text } = fields;
    changeInput({
      field: 'text', value: '',
    });
    try {
      await writeTweet({
        name: name || '이름없음', // 기본값
        pass: password,
        text,
      });
      await getRecent({
        cursor: this.props.firstId,
        recent: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { fields } = this.props;
    return <TweetWrite onChange={this.handleChange} fields={fields} onWrite={this.handleWrite}/>;
  }
}

export default connect(
  ({ write, tweets }) => ({
    fields: write.fields,
    firstId: tweets.list && tweets.list[0] && tweets.list[0]._id
  }),
  {
    changeInput,
    writeTweet,
    getRecent,
  }
)(TweetWriteContainer);
