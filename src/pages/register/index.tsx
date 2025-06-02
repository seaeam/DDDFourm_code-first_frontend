import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { register, updateUser } from '@/api/user'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/userInfo'

const initialValues = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
}

const formSchema = z.object({
  username: z.string().min(2, '至少2个字符').max(50, '最多50个字符'),
  email: z.string().email('无效的邮箱格式'),
  firstName: z.string(),
  lastName: z.string(),
})

function Register() {
  const { user, isLoggedIn, loading } = useUserStore()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-expect-error - zodResolver type mismatch with form schema
    resolver: zodResolver(formSchema),
    defaultValues: user || initialValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoggedIn && user) {
      await updateUser(user.ID, values)
    }
    else {
      await register(values)
      navigate('/')
    }
  }

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

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">用户名</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="请输入用户名"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          这是您的公开显示名称
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">邮箱</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="请输入邮箱"
                            type="email"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">名字</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="请输入名字"
                              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">姓氏</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="请输入姓氏"
                              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      disabled={loading}
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-3 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      {loading ? '处理中...' : (isLoggedIn ? '保存修改' : '立即注册')}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
