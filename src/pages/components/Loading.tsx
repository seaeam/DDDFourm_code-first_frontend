import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

function LoadingState() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-6">
        {/* 头部骨架 */}
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded-lg w-48 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
        </div>

        {/* 帖子列表骨架 */}
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                </div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mt-4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <div className="h-8 bg-gray-200 rounded w-16"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 加载指示器 */}
      <div className="fixed bottom-8 right-8">
        <div className="bg-white rounded-full p-4 shadow-lg border">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      </div>
    </div>
  )
}
export default LoadingState
