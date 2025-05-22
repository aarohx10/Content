import { Clock, FileText } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PostCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    date: string
    type: string
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{post.type}</Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {post.date}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <h3 className="font-semibold line-clamp-1">{post.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/drafts/${post.id}`}>
            <FileText className="mr-1 h-3 w-3" />
            Edit
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/drafts/${post.id}/preview`}>Preview</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
