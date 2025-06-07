import type { UserInfo } from '@/api/user/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserStore {
  user: UserInfo | null
  isLoggedIn: boolean
  loading: boolean
  setUser: (user: UserInfo) => void
  clearUser: () => void
  updateUser: (updates: Partial<UserInfo>) => void
  setLoading: (loading: boolean) => void
}

// 创建 Zustand store
export const useUserStore = create<UserStore>()(
  // 持久化存储
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      loading: false,

      // 设置用户信息
      setUser: (user: UserInfo) => {
        set({
          user,
          isLoggedIn: true,
          loading: false,
        })
      },

      // 清除用户信息（登出）
      clearUser: () => {
        set({
          user: null,
          isLoggedIn: false,
          loading: false,
        })
      },

      // 更新用户信息
      updateUser: (updates) => {
        const currentUser = get().user

        if (currentUser === null)
          return

        set({
          user: { ...currentUser, ...updates },
        })
      },

      // 设置加载状态
      setLoading: (loading: boolean) => {
        set({ loading })
      },
    }),
    {
      name: 'user-storage', // localStorage 中的 key
      storage: createJSONStorage(() => localStorage), // 使用 localStorage
      // 只持久化部分状态
      partialize: state => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
)
