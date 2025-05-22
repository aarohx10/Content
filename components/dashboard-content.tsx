"use client"

import Link from "next/link"
import { BarChart3, FileText, PlusCircle, Clock, ArrowUpRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PostCard } from "@/components/post-card"

export function DashboardContent() {
  const recentDrafts = [
    {
      id: "1",
      title: "5 Ways to Improve Your LinkedIn Profile",
      excerpt: "Learn how to optimize your LinkedIn profile to attract more connections and opportunities...",
      date: "2 hours ago",
      type: "LinkedIn Post",
    },
    {
      id: "2",
      title: "The Future of Remote Work",
      excerpt: "Exploring the trends and challenges of remote work in the post-pandemic world...",
      date: "Yesterday",
      type: "LinkedIn Post",
    },
    {
      id: "3",
      title: "Ultimate Guide to Content Marketing",
      excerpt: "A comprehensive guide to creating effective content marketing strategies...",
      date: "3 days ago",
      type: "Lead Magnet",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Create and manage your LinkedIn content</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/new-post">
            <PlusCircle className="h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lead Magnets</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Drafts</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/drafts">View All</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentDrafts.map((draft) => (
            <PostCard key={draft.id} post={draft} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Generate Post Ideas</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-muted-foreground">Get AI-generated ideas for your next LinkedIn post</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Sparkles className="h-3 w-3" />
                Generate Ideas
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Create Lead Magnet</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-muted-foreground">Create a new lead magnet to grow your audience</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <PlusCircle className="h-3 w-3" />
                Create New
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Schedule Posts</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-muted-foreground">Schedule your posts for optimal engagement</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Clock className="h-3 w-3" />
                Schedule
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Analytics</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-muted-foreground">View detailed analytics for your content</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <BarChart3 className="h-3 w-3" />
                View Analytics
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
