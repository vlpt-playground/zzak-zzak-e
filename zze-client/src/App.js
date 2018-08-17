import React from 'react';
import AppTemplate from './components/base/AppTemplate';
import Header from './components/base/Header';
import TweetItemListContainer from './containers/tweets/TweetItemListContainer';
import TweetWriteContainer from 'containers/tweets/TweetWriteContainer';
import TweetRemoveModalContainer from 'containers/tweets/TweetRemoveModalContainer';

const App = () => {
  return (
    <AppTemplate header={(<Header />)}> 
      <TweetWriteContainer />
      <TweetItemListContainer />
      <TweetRemoveModalContainer />
    </AppTemplate>
  );
};

export default App;