import { AuthGate } from './providers/auth-gate/AuthGate'
import { TodayProjects } from '@/widgets/today-projects/ui'
import { MainLayout } from './layouts'
import { Toaster } from '@/shared/ui'
import { ProgressGrid } from '@/widgets/progress-grid/ui'

const App = () => {
  return (
    <>
      <AuthGate>
        <MainLayout>
          <TodayProjects />
          <ProgressGrid />
        </MainLayout>
      </AuthGate>
      <Toaster />
    </>
  )
}

export { App }
