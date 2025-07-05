import type { FC } from 'react'
import { LogoutButton } from '@/features/auth/ui'
import { Outlet } from 'react-router-dom'
import { useAuthGate } from '@/app/providers/auth-gate/useAuthGate'

const MainLayout: FC = () => {
  const { user } = useAuthGate()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-semibold">AwakeME</h1>
        {user && <LogoutButton />}
      </header>

      <main className="flex-1 px-6 py-4">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
