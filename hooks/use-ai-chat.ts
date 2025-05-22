import { useState } from "react"
import { toast } from "sonner"

export type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  status?: "loading" | "error"
}

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you create content today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "Thinking...",
      role: "assistant",
      timestamp: new Date(),
      status: "loading",
    }
    setMessages((prev) => [...prev, loadingMessage])

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat",
          data: { message: content },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()

      // Replace loading message with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: data.response,
                status: undefined,
              }
            : msg
        )
      )
    } catch (error) {
      console.error("Error in chat:", error)
      // Replace loading message with error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: "I'm having trouble connecting. Please try again later.",
                status: "error",
              }
            : msg
        )
      )
      toast.error("Failed to get AI response")
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your AI assistant. How can I help you create content today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  }
} 