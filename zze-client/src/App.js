import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppTemplate from 'components/base/AppTemplate';
import HeaderContainer from 'containers/base/HeaderContainer';
import { TweetsPage, AuthPage, NotFoundPage } from 'pages';
import Core from 'containers/base/Core';
import { Rendered } from 'lib/shouldCancel';

const App = () => {
  return (
    <AppTemplate header={<HeaderContainer />}>
      <Switch>
        <Route exact path="/" component={TweetsPage} />
        <Route exact path="/users/:username" component={TweetsPage} />
        <Route exact path="/tags/:tag" component={TweetsPage} />
        <Route path="/:authType(login|register)" component={AuthPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Core />
      <Rendered />
    </AppTemplate>
  );
};

export default App;
