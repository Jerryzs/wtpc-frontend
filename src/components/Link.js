import React, { Children } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

function ActiveLink ({ children, ...props }) {
  const router = useRouter();
  const child = Children.only(children);

  var className = child.props.className || '';
  var active = props.href === router.pathname || router.pathname.startsWith(props.href + '/');
  if (active && props.activeClassName) {
    className = `${className} ${props.activeClassName}`.trim();
  }

  delete props.activeClassName;

  return (
    <Link
      {...props}
    >
      {React.cloneElement(child, { className })}
    </Link>
  );
}

export default ActiveLink;
