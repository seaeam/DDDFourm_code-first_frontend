import { Outlet } from 'react-router'
import { useUserStore } from '@/store/userInfo'

function Register() {
  const { isLoggedIn } = useUserStore()
  return (
    <>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="px-8 pt-8 pb-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {isLoggedIn ? '用户信息' : '用户注册'}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {isLoggedIn ? '修改您的个人信息' : '创建您的新账户'}
                </p>
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
