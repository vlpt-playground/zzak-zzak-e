import React from 'react';
import './TweetItemList.scss';
import TweetItem from '../TweetItem';

const TweetItemList = ({ tweets, onRemove }) => {
  if (!tweets) return null;
  const tweetItems = tweets.map(
    tweet => <TweetItem key={tweet._id} tweet={tweet} onRemove={onRemove}/>
  )
  return (
    <div className="TweetItemList">
      {tweetItems}
    </div>
  );
};

export default TweetItemList;