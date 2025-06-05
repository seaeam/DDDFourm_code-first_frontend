import type { PostsResponse } from './types'
import { toast } from 'sonner'
import instance from '../instance'

export async function getRecentPosts() {
  try {
    const response = await instance.get<PostsResponse>('/posts', {
      params: {
        sort: 'recent',
      },
    })

    return response.data
  }
  catch (error) {
    toast.warning('暂未获取到帖子')
    return String(error)
  }
}
