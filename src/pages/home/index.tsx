import type { Post } from '@/api/posts/types'
import {
  RefreshCw,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getRecentPosts } from '@/api/posts'
import { Button } from '@/components/ui/button'
import PostCard from './components/Card'
import EmptyState from './components/Empty'
import ErrorState from './components/Error'
import LoadingState from './components/Loading'

type PostsState =
  | {
    status: 'pending'
  }
  | {
    status: 'fulfilled'
    posts: Post[]
  }
  | {
    status: 'rejected'
    reason: string
  }

const initialPostsState: PostsState = {
  status: 'pending',
}

function HomePage() {
  const [postsState, setPostsState] = useState(initialPostsState)

  const fetchPosts = async () => {
    setPostsState({ status: 'pending' })

    const postsRes = await getRecentPosts()

    if (typeof postsRes === 'string') {
      setPostsState({ status: 'rejected', reason: postsRes })
      return
    }

    if (!postsRes.success) {
      setPostsState({ status: 'rejected', reason: postsRes.error })
      return
    }

    setPostsState({ status: 'fulfilled', posts: postsRes.data.posts })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 加载状态
  if (postsState.status === 'pending') {
    return <LoadingState />
  }

  // 错误状态
  if (postsState.status === 'rejected') {
    toast.error('帖子加载失败')
    return <ErrorState reason={postsState.reason} onRetry={fetchPosts} />
  }

  // 成功状态
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* 页面头部 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">最新帖子</h1>
        <p className="text-gray-600">发现社区中的最新讨论和精彩内容</p>
      </div>

      {/* 帖子列表 */}
      <div className="space-y-6">
        {postsState.posts.length > 0
          ? (
              postsState.posts.map(post => <PostCard key={post.id} post={post} />)
            )
          : (
              <EmptyState />
            )}
      </div>

      {/* 底部刷新按钮 */}
      {postsState.posts.length > 0 && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={fetchPosts}
            className="hover:shadow-md transition-shadow"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新更多
          </Button>
        </div>
      )}
    </div>
  )
}

export default HomePage
