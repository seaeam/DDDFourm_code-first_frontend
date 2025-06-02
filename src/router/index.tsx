import type { RouteObject } from 'react-router'
import HomePage from '@/pages/home'
import RegisterPage from '@/pages/register'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <RegisterPage />,
  },
]

export default routes
