import { Link, useLocation } from 'react-router'
import { useUserStore } from '@/store/userInfo'
import { Button } from './ui/button'

function Header() {
  const { user, isLoggedIn, clearUser } = useUserStore()
  const location = useLocation()

  const Logout = () => {
    clearUser()
  }

  return (

    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">DDD Forum</h1>
          <div className="flex items-center space-x-2">
            <Link
              to={location.pathname === '/' ? '/login' : '/'}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {location.pathname === '/' ? (user?.username ?? '注册') : '返回首页'}
            </Link>
            {isLoggedIn && <Button variant="destructive" onClick={Logout}>退出登录</Button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
