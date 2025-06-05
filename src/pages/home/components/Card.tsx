import type { Post } from '@/api/posts/types'
import { Marquee } from '@/components/magicui/marquee'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  User,
} from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import COMMENT_SUGGESTIONS from '../data/comments'

function PostCard({ post }: { post: Post }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)

  // 添加 ref 来引用输入框
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  // 使用 useMemo 确保建议只生成一次
  const commentSuggestions = useMemo(() => {
    const shuffled = [...COMMENT_SUGGESTIONS].sort(() => 0.5 - Math.random())
    const count = Math.floor(Math.random() * 10) + 15 // 10-15个建议
    return shuffled.slice(0, count)
  }, [post.id]) // 依赖于 post.id，每个帖子有不同的建议

  // 点击评论建议，填入评论框并聚焦
  const handleSuggestionClick = (suggestion: string) => {
    setNewComment(suggestion)
    // 聚焦到输入框
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
  }

  const commentsCount = post.comments?.length || 0

  // TODO 发送评论
  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      // 这里调用你的添加评论 API
      // await addComment(post.id, newComment)
      console.log('添加评论:', newComment)
      setNewComment('')
      // 重新获取帖子数据或更新本地状态
    } catch (error) {
      console.error('添加评论失败:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900">
              {post.memberPostedBy?.user?.username || '匿名用户'}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(post.dateCreated)}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            新帖
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
            <ThumbsUp className="w-4 h-4" />
            <span>
              {post.votes?.filter((vote) => vote.voteType === 'Upvote')
                .length || 0}
              赞
            </span>
          </div>
          <div className="flex items-center space-x-1 hover:text-red-600 cursor-pointer transition-colors">
            <ThumbsDown className="w-4 h-4" />
            <span>
              {post.votes?.filter((vote) => vote.voteType === 'Downvote')
                .length || 0}
              踩
            </span>
          </div>

          {/* 可点击的评论按钮 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleComments}
            className="flex items-center space-x-1 hover:text-green-600 transition-colors h-auto p-1"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{commentsCount} 评论</span>
            {showComments ? (
              <ChevronUp className="w-3 h-3 ml-1" />
            ) : (
              <ChevronDown className="w-3 h-3 ml-1" />
            )}
          </Button>
        </div>

        {/* 评论区域 */}
        {showComments && (
          <>
            <Separator className="my-4" />

            {/* 现有评论列表 */}
            {commentsCount > 0 && (
              <div className="space-y-3 mb-4">
                <h4 className="font-medium text-sm text-gray-900 mb-3">
                  评论 ({commentsCount})
                </h4>
                {post.comments?.map((comment, index) => (
                  <div
                    key={comment.id || index}
                    className="bg-gray-50 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {/* TODO 应该显示姓名而不是 id */}
                        {comment.id || '匿名用户'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {/* TODO 还没有给时间 */}
                        {formatDate(new Date().toISOString())}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 ml-8">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 快速回复建议 - 始终显示 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <p className="text-sm text-gray-600 font-medium">
                    {commentsCount > 0
                      ? '快速回复：'
                      : '还没有评论，试试这些快速回复：'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="text-xs h-auto p-1"
                >
                  {showSuggestions ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" />
                      收起
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" />
                      展开
                    </>
                  )}
                </Button>
              </div>

              {showSuggestions && (
                <div className="relative">
                  <Marquee pauseOnHover className="[--duration:100s]">
                    <div className="flex gap-2">
                      {commentSuggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-colors whitespace-nowrap"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </Marquee>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
                </div>
              )}
            </div>

            {/* 评论输入框 */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <Textarea
                    ref={textareaRef}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="写下你的评论..."
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      💡 点击上方快速回复可以快速填入评论
                    </p>
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || isSubmitting}
                      size="sm"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      {isSubmitting ? '发送中...' : '发送'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default PostCard
