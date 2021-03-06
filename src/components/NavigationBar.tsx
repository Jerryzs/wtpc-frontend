import Link from './Link'
import styles from '../scss/components/NavigationBar.module.scss'

function NavigationBar ({
  user,
  data
}: {
  user: SessionUser
  data: ReadonlyArray<Readonly<{
    name: string
    href: string
  }>>
}): JSX.Element {
  const navs = data.slice(0)

  if ($0.isUser(user)) {
    navs.push({
      name: user.name,
      href: `/user/${user.uid}`
    })
  } else {
    navs.push({
      name: 'Sign in',
      href: '/signin'
    })
  }

  return (
    <nav
      className={`${styles.wrapper} navbar navbar-expand-md navbar-dark`}
    >
      <div
        className='container-md'
      >
        <Link
          href='/'
        >
          <a
            className='navbar-brand'
          >
            <img
              src='/assets/logo-white.png'
              height='32px'
            />
          </a>
        </Link>

        <ul
          className='navbar-nav'
        >
          {
            navs.map((item, index) => (
              <li
                key={index}
                className='nav-item'
              >
                <Link
                  href={item.href}
                  activeClassName='active'
                >
                  <a
                    className='nav-link'
                  >
                    {item.name}
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  )
}

export default NavigationBar
