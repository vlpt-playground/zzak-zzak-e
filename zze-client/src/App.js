import React from 'react';
import AppTemplate from './components/base/AppTemplate';
import Header from './components/base/Header';
import TweetWrite from './components/tweets/TweetWrite';
import Loading from './components/common/Loading';
import TweetItemList from './components/tweets/TweetItemList';

const App = () => {
  return (
    <AppTemplate header={(<Header />)}> 
      <TweetWrite />
      <TweetItemList />
    </AppTemplate>
  );
};

export default App;