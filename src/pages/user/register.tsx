import type { UserFormData } from '@/api/user/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { register } from '@/api/user'
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
import { copy } from '@/utils/copy'

const defaultUserFormValues: Omit<UserFormData, 'avatar'> = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
}

const registerFormSchema = z.object({
  username: z.string().min(2, '至少2个字符').max(50, '最多50个字符'),
  email: z.string().email('无效的邮箱格式'),
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val || val.length === 0) {
          return true
        }

        return (
          val.length >= 8
          && val.length <= 20
          && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val)
        )
      },
      {
        message: '密码必须包含8-20个字符，包含大小写字母和数字',
      },
    ),
})

type FormSchema = z.infer<typeof registerFormSchema>

function Register() {
  const { loading } = useUserStore()
  const navigate = useNavigate()

  const form = useForm<FormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: defaultUserFormValues,
  })

  async function onSubmitImpl(values: FormSchema) {
    const randomPassword = Math.random().toString(36).slice(-8)

    if (!values.password) {
      toast.promise(copy(randomPassword), {
        loading: `初始密码为空，正在粘贴到剪切板`,
        success: () => ({ message: '密码未设置，已粘贴到剪切板' }),
        error: `请手动复制你的密码: ${randomPassword}`,
      })
      values.password = randomPassword
    }
    await register(values)
    navigate('/')
  }
  const onSubmit = debounce(onSubmitImpl)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                用户名
              </FormLabel>
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
              <FormLabel className="text-sm font-medium text-gray-700">
                邮箱
              </FormLabel>
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
                <FormLabel className="text-sm font-medium text-gray-700">
                  名字
                </FormLabel>
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
                <FormLabel className="text-sm font-medium text-gray-700">
                  姓氏
                </FormLabel>
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                密码
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入密码"
                  type="password"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-3 transition-all duration-200 transform hover:scale-[1.02]"
          >
            {loading ? '处理中...' : '立即注册'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default Register
