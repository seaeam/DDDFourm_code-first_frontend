import type {
  GetUserResponse,
  RegisterResponse,
  UpdateUserResponse,
  UserInfo,
} from './types'
import axios from 'axios'
import { toast } from 'sonner'
import { useUserStore } from '@/store/userInfo'
import instance from '../instance'

// 获取用户信息
export async function getUserByEmail(email: string) {
  if (!email) {
    toast.error('邮箱不能为空')
    return
  }

  try {
    const response = await instance.get<GetUserResponse>('/users', {
      params: {
        email,
      },
    })
    return response.data
  }
  catch (error) {
    toast.error('获取用户信息失败')
    throw error
  }
}

export async function register(userInfo: Omit<UserInfo, 'id'>) {
  const { setUser, setLoading } = useUserStore.getState()
  try {
    setLoading(true)
    const response = await instance.post<RegisterResponse>('/users/new', {
      ...userInfo,
    })

    setUser(response.data.data)
    toast.success('注册成功')

    return response.data
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || '注册失败'
      toast.error(errorMessage)
    }
    throw error
  }
  finally {
    setLoading(false)
  }
}

// 更新用户信息
export async function updateUser(userId: string, userInfo: Partial<UserInfo>) {
  const { setUser, setLoading } = useUserStore.getState()
  try {
    setLoading(true)

    const response = await instance.post<UpdateUserResponse>(
      `/users/edit/?userId=${userId}`,
      userInfo,
    )

    const state = response.data

    if (state.success) {
      toast.success('更新成功')
      setUser(state.data)
    }
    else {
      toast.error(state.error)
    }

    return state
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || '更新失败'
      toast.error(errorMessage)
    }
    else if (error instanceof Error) {
      toast.error(error.message)
    }
    else {
      toast.error('更新失败')
    }
  }
  finally {
    setLoading(false)
  }
}
