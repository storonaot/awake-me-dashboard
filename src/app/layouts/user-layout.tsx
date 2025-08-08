import type { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { UserRoutePath } from '../tmp'

const navbarList = Object.values(UserRoutePath).map(userRoutePath => ({
  name: userRoutePath,
  label: userRoutePath,
  to: `/${userRoutePath}`,
}))

const NavBar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-6 shrink-0">
      <nav>
        <ul className="space-y-4">
          {navbarList.map(({ name, label, to }) => (
            <li key={name}>
              <Link to={to} className="text-blue-600 hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <NavBar />
      <main className="flex-1 bg-white p-6 overflow-x-auto">{children}</main>
    </div>
  )
}

export default UserLayout
