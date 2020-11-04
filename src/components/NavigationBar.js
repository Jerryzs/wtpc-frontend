import Link from './Link';

import styles from '../scss/components/NavigationBar.module.scss';

const __navitems = [{
  name: 'Home',
  href: '/'
},
{
  name: 'Forum',
  href: '/forum'
}];

function NavigationBar ({ user, data }) {
  const navs = (data?.length ? data : __navitems).slice(0);

  if (user.uid) {
    navs.push({
      name: user.name,
      href: `/user/${user.uid}`
    });
  } else {
    navs.push({
      name: 'Sign in',
      href: '/signin'
    });
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
  );
}

export default NavigationBar;
