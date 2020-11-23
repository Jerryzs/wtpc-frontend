import React, { Children } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

function ActiveLink ({
  children,
  href,
  ...props
}: {
  children: React.ReactNode,
  href: string,
  [prop: string]: any
}): JSX.Element {
  const router = useRouter();
  const child = React.Children.only(children) as React.ReactElement<{ className?: string, [prop: string]: any }, 'a'>;

  var className = child.props.className ?? '';
  var active = props.href === router.pathname || router.pathname.startsWith(props.href + '/');
  if (active && props.activeClassName) {
    className = `${className} ${props.activeClassName}`.trim();
  }

  delete props.activeClassName;

  return (
    <Link
      href={href}
      {...props}
    >
      {React.cloneElement(child, { className })}
    </Link>
  );
}

export default ActiveLink;
