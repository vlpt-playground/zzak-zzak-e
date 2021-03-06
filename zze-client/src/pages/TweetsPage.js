import React from 'react';
import TweetsTemplate from 'components/tweets/TweetsTemplate/TweetsTemplate';
import TweetWriteContainer from 'containers/tweets/TweetWriteContainer';
import TweetItemListContainer from 'containers/tweets/TweetItemListContainer';
import TweetRemoveModalContainer from 'containers/tweets/TweetRemoveModalContainer';

const TweetsPage = ({ match }) => {
  return (
    <TweetsTemplate>
      {match.path === '/' && <TweetWriteContainer />}
      <TweetItemListContainer />
      <TweetRemoveModalContainer />
    </TweetsTemplate>
  );
};

export default TweetsPage;
