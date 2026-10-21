import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.js'

function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout