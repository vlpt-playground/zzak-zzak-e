import React from 'react';
import './TweetItemList.scss';
import TweetItem from '../TweetItem';

const TweetItemList = () => {
  return (
    <div className="TweetItemList">
      <TweetItem />
      <TweetItem />
      <TweetItem />
      <TweetItem />
      <TweetItem />
    </div>
  );
};

export default TweetItemList;