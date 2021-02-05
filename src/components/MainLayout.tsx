import NavigationBar from './NavigationBar'
import MobileNavigation from './MobileNavigation'
import Footer from './Footer'

function MainLayout ({
  user,
  children
}: {
  user: SessionUser
  children: React.ReactNode
}): JSX.Element {
  return (
    <>
      <div
        className='alert alert-warning text-center mb-0 d-none'
      >
        <div
          className='container'
        />
      </div>

      <header
        className='sticky-top'
      >
        <NavigationBar
          user={user}
          data={[
            {
              name: 'Home',
              href: '/'
            },
            {
              name: 'Forum',
              href: '/forum'
            }
          ]}
        />
      </header>

      <main>
        <div
          className='container my-3'
        >
          {children}
        </div>
      </main>

      <footer>
        <Footer />
      </footer>

      <MobileNavigation
        data={[
          {
            name: 'Home',
            href: '/',
            icon: '/assets/icons/home.svg'
          },
          {
            name: 'Forum',
            href: '/forum',
            icon: '/assets/icons/forum.svg'
          }
        ]}
      />
    </>
  )
}

export default MainLayout
