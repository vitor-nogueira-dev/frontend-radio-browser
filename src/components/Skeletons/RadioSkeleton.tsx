import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function RadioSkeleton() {
  return (
    <Card className="mb-2 w-">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center flex-1 max-w-32">
          <div className="w-full">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardContent>
    </Card>
  )
}