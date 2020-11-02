import Link from './Link';

import styles from '../scss/components/MobileNavigation.module.scss';

const __navitems = [{
  name: 'Home',
  href: '/',
  icon: '/assets/icons/home.svg'
},
{
  name: 'Forum',
  href: '/forum',
  icon: '/assets/icons/forum.svg'
}];

function MobileNavigation ({ data }) {
  const navs = data?.length ? data : __navitems;

  return (
    <nav
      className={styles.wrapper}
    >
      <ul>
        {
          navs.map((item, index) => {
            return (
              <li
                key={index}
              >
                <Link
                  href={item.href}
                  activeClassName='active'
                >
                  <a
                    className='text-decoration-none'
                  >
                    <img
                      src={item.icon}
                    />

                    {item.name}
                  </a>
                </Link>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

export default MobileNavigation;
