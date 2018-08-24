import React from 'react';
import AuthTemplate from 'components/auth/AuthTemplate';
import HideHeader from 'containers/base/HideHeader';
import AuthFormContainer from 'containers/auth/AuthFormContainer';

const AuthPage = ({ match }) => {
  const { authType } = match.params;
  return (
    <AuthTemplate type={authType}>
      <HideHeader />
      <AuthFormContainer type={authType} />
    </AuthTemplate>
  );
};

export default AuthPage;
