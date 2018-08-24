import React, { Component } from 'react';
import { loadUser } from 'lib/common';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';
import { bindActionCreators } from 'redux';

// 렌더링하는 것은 없지만, 페이지에 처음 들어왔을 때 해야 할 작업들을 여기서 합니다.
class Core extends Component {
  initialize = async () => {
    const user = loadUser();
    if (user) {
      const { UserActions } = this.props;
      UserActions.tempSetUser(user);
      try {
        await UserActions.checkAuth();
        const today = Math.round(new Date().getTime());
        if (this.props.tokenExp - today > 60 * 60 * 24 * 3) {
          await UserActions.refreshToken();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return null;
  }
}

export default connect(
  ({ user }) => ({
    tokenExp: user.tokenExp,
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(Core);
