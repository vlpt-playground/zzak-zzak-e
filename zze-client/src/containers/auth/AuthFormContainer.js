import React, { Component } from 'react';
import AuthForm from 'components/auth/AuthForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as userActions from 'store/modules/user';
import { saveUser } from 'lib/common';

class AuthFormContainer extends Component {
  handleChange = e => {
    // e.target 에서 인풋의 변화 정보를 가져오고
    const { name, value } = e.target;
    // 액션을 발생시켜 리덕스의 상태를 업데이트합니다.
    // 이 부분은 컴포넌트의 state 를 사용해도 상관없습니다.
    const { AuthActions } = this.props;
    AuthActions.changeInput({
      field: name,
      value,
    });
  };

  handleGoBack = () => {
    // 라우터의 history 를 사용하여 뒤로가기를 합니다.
    // 코드 최 하단에서 withRouter HOC 를 사용했기에 history 에 접근이 가능합니다.
    const { history } = this.props;
    history.goBack();
  };

  handleRegister = async () => {
    // 가입을 합니다.
    const { fields, AuthActions, UserActions } = this.props;
    const { username, password, passwordConfirm } = fields;

    // 우선 다양한 규칙을 검사합니다.
    if (password !== passwordConfirm) {
      AuthActions.setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!/^[a-z-0-9-_]{3,15}$/.test(username)) {
      AuthActions.setError('계정명은 3~15자의 영소문자/숫자여야합니다');
      return;
    }

    if (password.length < 6) {
      AuthActions.setError('비밀번호가 너무 짧습니다.');
      return;
    }

    // 다 통과했으면 가입요청을 시작합니다
    try {
      await AuthActions.register({
        username,
        password,
      });
      // 이 시점에서는 쿠키 설정이 완료된 상태입니다.
      // checkAuth 를 통하여 현재 계정 정보를 가져옵니다.
      await UserActions.checkAuth();
      // 계정 정보를 로컬 스토리지에 저장합니다.
      // 여기서 [this.props].user 를 해주는것이 중요합니다.
      // 꼭, this 에서 불러와야 업데이트되고 난 후의 데이터를 읽을 수 있습니다.
      // 만약에 사전에 비구조화 할당 하신다면 이전의 데이터를 가르키게 됩니다.
      saveUser(this.props.user);
      // 모두 끝나고 홈 경로로 이동합니다.
      this.props.history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  handleLogin = async () => {
    // 로그인을 합니다. 흐름은 회원가입과 매우 비슷합니다.
    const { fields, AuthActions, UserActions } = this.props;
    const { username, password } = fields;
    try {
      if (!username) {
        AuthActions.setError('아이디를 입력하세요.');
        return;
      }
      if (!password) {
        AuthActions.setError('비밀번호를 입력하세요.');
        return;
      }
      await AuthActions.login({ username, password });
      await UserActions.checkAuth();
      saveUser(this.props.user);
      this.props.history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    // 폼 정보를 초기화합니다.
    const { AuthActions } = this.props;
    AuthActions.initialize();
  }
  componentDidUpdate(prevProps, prevState) {
    // type 이 바뀔 때 폼 정보를 초기화 합니다.
    // (회원가입 <-> 로그인)
    if (prevProps.type !== this.props.type) {
      const { AuthActions } = this.props;
      AuthActions.initialize();
    }
  }
  render() {
    const { type, fields, error } = this.props;
    return (
      <AuthForm
        register={type === 'register'}
        onGoBack={this.handleGoBack}
        onChange={this.handleChange}
        onSubmit={type === 'register' ? this.handleRegister : this.handleLogin}
        fields={fields}
        error={error}
      />
    );
  }
}

// compose 를 사용하면 여러개의 HOC 를 깔끔하게 사용 할 수 있습니다.
export default compose(
  withRouter,
  connect(
    ({ auth, user }) => ({
      fields: auth.fields,
      error: auth.error,
      user: user.user,
    }),
    dispatch => ({
      AuthActions: bindActionCreators(authActions, dispatch),
      UserActions: bindActionCreators(userActions, dispatch),
    })
  )
)(AuthFormContainer);
