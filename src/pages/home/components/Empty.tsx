import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function EmptyState() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              暂无帖子
            </h3>
            <p className="text-gray-500 mb-4">
              还没有人发布帖子，成为第一个发帖的人吧！
            </p>
            <Button>发布第一个帖子</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EmptyState
