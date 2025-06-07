import type { Post } from '@/api/posts/types'
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
import { useRef, useState } from 'react'
import { Marquee } from '@/components/magicui/marquee'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import useRandomComments from '@/hooks/useRandomComments'

interface CommentState {
  showComments: boolean
  newComment: string
  isSubmitting: boolean
  showSuggestions: boolean
}

function PostCard({ post }: { post: Post }) {
  const [commentState, setCommentState] = useState<CommentState>({
    showComments: false,
    newComment: '',
    isSubmitting: false,
    showSuggestions: true,
  })

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const commentSuggestions = useRandomComments()

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
    setCommentState(prev => ({ ...prev, showComments: !prev.showComments }))
  }

  const handleSuggestionClick = (suggestion: string) => {
    setCommentState(prev => ({ ...prev, newComment: suggestion }))
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
  }

  const commentsCount = post.comments?.length || 0

  const handleAddComment = async () => {
    if (!commentState.newComment.trim())
      return

    setCommentState(prev => ({ ...prev, isSubmitting: true }))
    try {
      // 这里调用你的添加评论 API
      // await addComment(post.id, commentState.newComment)
      setCommentState(prev => ({ ...prev, newComment: '', isSubmitting: false }))
      // 重新获取帖子数据或更新本地状态
    }
    catch (error) {
      console.error('添加评论失败:', error)
      setCommentState(prev => ({ ...prev, isSubmitting: false }))
    }
  }

  const postUser = post.memberPostedBy.user
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center">
            {postUser.avatar
              ? (
                  <Avatar>
                    <AvatarImage src={postUser.avatar} />
                    <AvatarFallback>{postUser.username.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                )
              : (
                  <User className="w-5 h-5 text-black" />
                )}
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
              {post.votes?.filter(vote => vote.voteType === 'Upvote').length || 0}
              赞
            </span>
          </div>
          <div className="flex items-center space-x-1 hover:text-red-600 cursor-pointer transition-colors">
            <ThumbsDown className="w-4 h-4" />
            <span>
              {post.votes?.filter(vote => vote.voteType === 'Downvote').length || 0}
              踩
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleComments}
            className="flex items-center space-x-1 hover:text-green-600 transition-colors h-auto p-1"
          >
            <MessageSquare className="w-4 h-4" />
            <span>
              {commentsCount}
              {' '}
              评论
            </span>
            {commentState.showComments
              ? (
                  <ChevronUp className="w-3 h-3 ml-1" />
                )
              : (
                  <ChevronDown className="w-3 h-3 ml-1" />
                )}
          </Button>
        </div>

        {commentState.showComments && (
          <>
            <Separator className="my-4" />

            {commentsCount > 0 && (
              <div className="space-y-3 mb-4">
                <h4 className="font-medium text-sm text-gray-900 mb-3">
                  评论 (
                  {commentsCount}
                  )
                </h4>
                {post.comments?.map((comment, index) => (
                  <div key={comment.id || index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className=" font-medium text-xs text-gray-700">
                        {comment.id || '匿名用户'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(new Date().toISOString())}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 ml-8">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <p className="text-sm text-gray-600 font-medium">
                    {commentsCount > 0 ? '快速回复：' : '还没有评论，试试这些快速回复：'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCommentState(prev => ({
                      ...prev,
                      showSuggestions: !prev.showSuggestions,
                    }))}
                  className="text-xs h-auto p-1"
                >
                  {commentState.showSuggestions
                    ? (
                        <>
                          <ChevronUp className="w-3 h-3 mr-1" />
                          收起
                        </>
                      )
                    : (
                        <>
                          <ChevronDown className="w-3 h-3 mr-1" />
                          展开
                        </>
                      )}
                </Button>
              </div>

              {commentState.showSuggestions && (
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

            <div className="space-y-3">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <Textarea
                    ref={textareaRef}
                    value={commentState.newComment}
                    onChange={e =>
                      setCommentState(prev => ({ ...prev, newComment: e.target.value }))}
                    placeholder="写下你的评论..."
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      💡 点击上方快速回复可以快速填入评论
                    </p>
                    <Button
                      onClick={handleAddComment}
                      disabled={
                        !commentState.newComment.trim() || commentState.isSubmitting
                      }
                      size="sm"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      {commentState.isSubmitting ? '发送中...' : '发送'}
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
