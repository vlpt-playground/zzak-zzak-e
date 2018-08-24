import React, { Component } from 'react';
import { loadUser } from 'lib/common';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';
import { bindActionCreators } from 'redux';

// 렌더링하는 것은 없지만, 페이지에 처음 들어왔을 때 해야 할 작업들을 여기서 합니다.
class Core extends Component {
  initialize = async () => {
    const user = loadUser(); // 유저 정보를 로컬스토리지에서 확인하고
    if (user) {
      // 있으면 임시로 설정 (로그인 상태 확인 API 응답할때까지 임시로 보여주기 위함)
      const { UserActions } = this.props;
      UserActions.tempSetUser(user);
      try {
        // 실제로 로그인 유효한지 확인하고
        await UserActions.checkAuth();
        const today = Math.round(new Date().getTime());
        if (this.props.tokenExp - today > 60 * 60 * 24 * 3) {
          // 토큰 유효이간이 3일 미만이면 토큰 재발급
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
