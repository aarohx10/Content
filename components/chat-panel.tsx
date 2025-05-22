"use client"

import { useState } from "react"
import { SendHorizontal, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAIChat } from "@/hooks/use-ai-chat"

export function ChatPanel() {
  const { messages, isLoading, sendMessage } = useAIChat()
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return
    sendMessage(input)
    setInput("")
  }

  const handleQuickAction = (action: string) => {
    if (isLoading) return
    const message = `Please help me ${action}`
    setInput(message)
    handleSendMessage()
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <p className="text-sm text-muted-foreground">Ask for help with content creation</p>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.status === "error"
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                disabled={isLoading}
              />
              <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleQuickAction("generate a post idea")}
                disabled={isLoading}
              >
                <Sparkles className="mr-1 h-3 w-3" />
                Generate post idea
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleQuickAction("improve my draft")}
                disabled={isLoading}
              >
                <Sparkles className="mr-1 h-3 w-3" />
                Improve my draft
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="flex-1 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">LinkedIn Post Template</h3>
                <p className="text-sm text-muted-foreground">
                  A structured template for creating engaging LinkedIn posts
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleQuickAction("create a LinkedIn post template")}
                  disabled={isLoading}
                >
                  Use Template
                </Button>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Lead Magnet Ideas</h3>
                <p className="text-sm text-muted-foreground">Generate ideas for lead magnets that convert</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleQuickAction("generate lead magnet ideas")}
                  disabled={isLoading}
                >
                  Generate Ideas
                </Button>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Content Calendar</h3>
                <p className="text-sm text-muted-foreground">Create a content calendar for the next month</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleQuickAction("create a content calendar")}
                  disabled={isLoading}
                >
                  Create Calendar
                </Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
