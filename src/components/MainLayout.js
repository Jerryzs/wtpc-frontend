import NavigationBar from './NavigationBar';
import MobileNavigation from './MobileNavigation';
import Footer from './Footer';

function MainLayout ({ user, children }) {
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

      <MobileNavigation />
    </>
  );
}

export default MainLayout;
