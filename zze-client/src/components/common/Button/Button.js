import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import './Button.scss';

const Button = ({ children, outline, className, active, to, ...rest }) => {
  return React.createElement(to ? Link : 'button', {
    to,
    className: cn('Button', className, { outline, active }),
    children,
    ...rest,
  });
  // 위 코드는 아래와 같습니다:
  // if (to) {
  //   return (
  //     <Link to={to} className={cn('Button', className, { outline })} {...rest}>
  //       {children}
  //     </Link>
  //   );
  // }
  // return (
  //   <button className={cn('Button', className, { outline })} {...rest}>
  //     {children}
  //   </button>
  // );
};

export default Button;
