import NavigationBar from './NavigationBar'
import MobileNavigation from './MobileNavigation'
import Footer from './Footer'
import $c from '../configs/global.config'

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
          data={$c.navigations}
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
        data={$c.navigations}
      />
    </>
  )
}

export default MainLayout
