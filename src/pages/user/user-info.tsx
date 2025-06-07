import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import { Camera } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import ReactAvatar, { genConfig } from 'react-nice-avatar'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateUser, updateUserAvatar } from '@/api/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

const userInfoFormSchema = z.object({
  username: z.string().min(2, '至少2个字符').max(50, '最多50个字符'),
  email: z.string().email('无效的邮箱格式'),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().nullable().optional(),
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

type FormSchema = z.infer<typeof userInfoFormSchema>

function UserInfo() {
  const { user, loading } = useUserStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(userInfoFormSchema),
    defaultValues: user!,
  })

  async function onSubmitImpl(values: FormSchema) {
    if (!user)
      return

    await updateUser(user.id, values)
  }
  const onSubmit = debounce(onSubmitImpl)

  const handleAvatarFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      toast.warning('请选择图片文件')
      return
    }

    if (!user)
      return
    await updateUserAvatar(user.id, file)
  }
  // 触发文件选择
  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel className="text-sm font-medium text-gray-700">头像</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 sm:border-4 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
                    {field.value && field.value.startsWith('data:')
                      ? (
                          <img
                            src={field.value}
                            alt="头像"
                            className="w-full h-full object-cover"
                          />
                        )
                      : user?.avatar
                        ? (
                            <Avatar className="w-full h-full">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                          )
                        : (
                            <ReactAvatar
                              className="w-full h-full object-cover"
                              {...genConfig(form.getValues().email)}
                            />
                          )}
                  </div>

                  {/* 上传按钮 - 悬浮在头像右下角 */}
                  <button
                    type="button"
                    onClick={triggerFileUpload}
                    className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1.5 shadow-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Camera className="w-3 h-3" />
                  </button>

                  {/* 隐藏的文件输入 */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileUpload}
                    className="hidden"
                  />
                </div>
              </FormControl>

              {/* 上传按钮 - 在头像下方 */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={triggerFileUpload}
                className="mt-2 text-xs"
              >
                <Camera className="w-3 h-3 mr-1" />
                更换头像
              </Button>

              <FormMessage />
            </FormItem>
          )}
        />
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">密码</FormLabel>
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
            {loading ? '处理中...' : '修改'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UserInfo
