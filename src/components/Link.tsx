import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function ActiveLink ({
  children,
  href,
  activeClassName = '',
  ...props
}: {
  children: React.ReactNode
  href: string
  activeClassName?: string
  [prop: string]: any
}): JSX.Element {
  const router = useRouter()
  const child = React.Children.only(children) as React.ReactElement<{ className?: string, [prop: string]: any }, 'a'>

  var className = child.props.className ?? ''
  var active = href === router.pathname || router.pathname.startsWith(href + '/')
  if (active) {
    className = `${className} ${activeClassName}`.trim()
  }

  return (
    <Link
      href={href}
      {...props}
    >
      {React.cloneElement(child, { className })}
    </Link>
  )
}

export default ActiveLink
