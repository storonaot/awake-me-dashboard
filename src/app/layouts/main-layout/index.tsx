import type { FC, PropsWithChildren } from 'react'
import { LogoutButton } from '@/features/auth/ui'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-semibold">AwakeME</h1>
        <LogoutButton />
      </header>

      <main className="flex-1 px-6 py-4">{children}</main>
    </div>
  )
}

export default MainLayout
