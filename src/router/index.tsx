import type { RouteObject } from 'react-router'
import { Navigate } from 'react-router'
import HomePage from '@/pages/home'
import User from '@/pages/user'
import Login from '@/pages/user/login'
import Register from '@/pages/user/register'
import UserInfo from '@/pages/user/user-info'
import { useUserStore } from '@/store/userInfo'

function UserRedirect() {
  const { isLoggedIn } = useUserStore()

  if (isLoggedIn) {
    return <Navigate to="/user/info" replace />
  }
  else {
    return <Navigate to="/user/register" replace />
  }
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/user',
    element: <User />,
    children: [
      {
        index: true,
        element: <UserRedirect />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'info',
        element: <UserInfo />,
      },
    ],
  },
]

export default routes
