import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav aria-label="Điều hướng chính">
      <NavLink to="/" end>
        Trang chủ
      </NavLink>
      {' | '}
      <NavLink to="/tasks" end>
        Danh sách
      </NavLink>
      {' | '}
      <NavLink to="/tasks/new" end>
        Thêm mới
      </NavLink>
    </nav>
  )
}

export default NavBar