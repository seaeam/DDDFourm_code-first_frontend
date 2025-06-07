import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function ErrorState({
  reason,
  onRetry,
}: {
  reason: string
  onRetry: () => void
}) {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                加载失败
              </h3>
              <p className="text-red-700 mb-4">
                {reason || '无法获取帖子数据，请稍后重试'}
              </p>
              <Button
                onClick={onRetry}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                重新加载
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ErrorState
