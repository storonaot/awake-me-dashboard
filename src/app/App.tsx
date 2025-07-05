// App.tsx
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/shared/ui'
import { router } from './providers/router'

const App = () => (
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
)

export { App }
