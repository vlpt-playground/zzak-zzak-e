import React, { Component } from 'react';
import Header from 'components/base/Header';
import { connect } from 'react-redux';
import Button from 'components/common/Button/Button';
import UserStatus from 'components/base/UserStatus';
import * as userActions from 'store/modules/user';
import { bindActionCreators } from 'redux';
import { clearUser } from 'lib/common';

class HeaderContainer extends Component {
  handleLogout = () => {
    const { UserActions } = this.props;
    clearUser();
    UserActions.logout();
  };
  render() {
    const { user, visible } = this.props;

    if (!visible) return null;

    return (
      <Header
        right={
          user ? (
            <UserStatus username={user.username} onLogout={this.handleLogout} />
          ) : (
            <Button outline to="login">
              로그인
            </Button>
          )
        }
      />
    );
  }
}

export default connect(
  ({ user, base }) => ({
    visible: base.header,
    user: user.user,
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(HeaderContainer);
