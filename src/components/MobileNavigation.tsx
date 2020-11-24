import Link from './Link'
import styles from '../scss/components/MobileNavigation.module.scss'

const NAVITEMS = [{
  name: 'Home',
  href: '/',
  icon: '/assets/icons/home.svg'
},
{
  name: 'Forum',
  href: '/forum',
  icon: '/assets/icons/forum.svg'
}]

function MobileNavigation ({
  data
}: {
  data?: Array<{
    name: string
    href: string
    icon: string
  }>
}): JSX.Element {
  const navs = data?.length !== undefined ? data : NAVITEMS

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
            )
          })
        }
      </ul>
    </nav>
  )
}

export default MobileNavigation
