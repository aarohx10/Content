"use client"

import type React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChatPanel } from "@/components/chat-panel"
import { Button } from "@/components/ui/button"
import { ChevronRight, MessageSquare } from "lucide-react"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Error boundary for the main content
  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 md:px-6">{children}</div>
      </main>

      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-12 top-4 z-10 rounded-full shadow-md"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? <ChevronRight className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
        </Button>

        <div
          className={`h-screen w-[320px] border-l transition-all duration-300 ease-in-out ${
            isChatOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ChatPanel />
        </div>
      </div>
    </div>
  )
}
