import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import ko from 'date-fns/locale/ko';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import { Link } from 'react-router-dom';
import './TweetItem.scss';

const TweetItem = ({ tweet, onRemove, currentUser }) => {
  const { writer, tags, _id, text, createdAt } = tweet;

  const tagItems = tags.map(tag => (
    <Link to={`/tags/${tag}`} className="tag-item" key={tag}>
      {tag}
    </Link>
  ));

  // 익명이거나, 익명이 아니고 유저명이 같을때 삭제 가능함
  const removable =
    writer.anonymous || (!writer.anonymous && currentUser === writer.name);

  return (
    <div className="TweetItem">
      <div className="tweet-head">
        <div className="writer">
          {writer.anonymous ? (
            <span className="anonymous-name">
              {writer.name}
              <span className="hash">({writer.ipHash})</span>
            </span>
          ) : (
            <Link to={`/users/${writer.name}`} className="username">
              {writer.name}
            </Link>
          )}
        </div>
        <div className="date">
          {distanceInWordsToNow(createdAt, { locale: ko, addSuffix: true })}
        </div>
        {/* 
        
        */}
        {removable && (
          <div
            className="remove"
            onClick={() => onRemove({ id: _id, needPass: writer.anonymous })}
          >
            [삭제]
          </div>
        )}
      </div>
      <div className="text">{text}</div>
      {tags.length > 0 && <div className="tags">{tagItems}</div>}
    </div>
  );
};

TweetItem.defaultProps = {
  tweet: {
    writer: {
      name: 'velopert',
      anonymous: true,
      ipHash: '888bf',
    },
    tags: [],
    _id: '5b76ce2920cbfe1fcfc4ebc8',
    text: '안녕하세요.\n내용입니다.',
    createdAt: '2018-08-17T13:31:21.644Z',
    __v: 0,
  },
};

export default onlyUpdateForKeys(['tweet', 'currentUser'])(TweetItem);
