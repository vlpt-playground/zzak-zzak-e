import React, { Fragment } from 'react';
import NotFound from 'components/base/NotFound/NotFound';
import HideHeader from 'containers/base/HideHeader';

const NotFoundPage = ({ staticContext }) => {
  // StaticRouter 를 통해서 렌더링 될 시
  // props 로 넣어줬던 context 값이 staticContext 으로 전달됨
  if (staticContext) {
    staticContext.code = 404;
  }
  return (
    <Fragment>
      <NotFound />
      <HideHeader />
    </Fragment>
  );
};

export default NotFoundPage;
