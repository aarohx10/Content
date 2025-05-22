import { useState } from "react"
import { toast } from "sonner"
import type { PostType, PostIdea, PostContent, LeadMagnet, EmailContent } from "@/lib/api"

type Step = "type" | "idea" | "content" | "leadMagnet" | "review"

export function usePostCreation() {
  const [step, setStep] = useState<Step>("type")
  const [postType, setPostType] = useState<PostType | "">("")
  const [postIdea, setPostIdea] = useState<PostIdea | null>(null)
  const [postContent, setPostContent] = useState<PostContent | null>(null)
  const [leadMagnet, setLeadMagnet] = useState<LeadMagnet | null>(null)
  const [emailContent, setEmailContent] = useState<EmailContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleNextStep = async () => {
    if (step === "type") {
      setStep("idea")
    } else if (step === "idea") {
      if (!postIdea) {
        toast.error("Please generate or enter a post idea first")
        return
      }
      setStep("content")
    } else if (step === "content") {
      if (!postContent) {
        toast.error("Please generate or enter post content first")
        return
      }
      setStep("leadMagnet")
    } else if (step === "leadMagnet") {
      if (!leadMagnet) {
        toast.error("Please generate or select a lead magnet first")
        return
      }
      setStep("review")
    }
  }

  const handlePreviousStep = () => {
    if (step === "idea") setStep("type")
    else if (step === "content") setStep("idea")
    else if (step === "leadMagnet") setStep("content")
    else if (step === "review") setStep("leadMagnet")
  }

  const generateIdea = async () => {
    if (!postType) {
      toast.error("Please select a post type first")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "post-idea",
          data: { postType },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate post idea")
      }

      const data = await response.json()
      setPostIdea(data)
      toast.success("Post idea generated successfully")
    } catch (error) {
      console.error("Error generating post idea:", error)
      toast.error("Failed to generate post idea")
    } finally {
      setIsLoading(false)
    }
  }

  const generateContent = async () => {
    if (!postIdea || !postType) {
      toast.error("Please generate a post idea first")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "post-content",
          data: { idea: postIdea, postType },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate post content")
      }

      const data = await response.json()
      setPostContent(data)
      toast.success("Post content generated successfully")
    } catch (error) {
      console.error("Error generating post content:", error)
      toast.error("Failed to generate post content")
    } finally {
      setIsLoading(false)
    }
  }

  const generateLeadMagnet = async (type: LeadMagnet["type"]) => {
    if (!postContent) {
      toast.error("Please generate post content first")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "lead-magnet",
          data: { postContent, type },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate lead magnet")
      }

      const data = await response.json()
      setLeadMagnet(data)
      toast.success("Lead magnet generated successfully")
    } catch (error) {
      console.error("Error generating lead magnet:", error)
      toast.error("Failed to generate lead magnet")
    } finally {
      setIsLoading(false)
    }
  }

  const generateEmailContent = async () => {
    if (!postContent || !leadMagnet) {
      toast.error("Please generate post content and lead magnet first")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "email-content",
          data: { postContent, leadMagnet },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate email content")
      }

      const data = await response.json()
      setEmailContent(data)
      toast.success("Email content generated successfully")
    } catch (error) {
      console.error("Error generating email content:", error)
      toast.error("Failed to generate email content")
    } finally {
      setIsLoading(false)
    }
  }

  const updatePostIdea = (updates: Partial<PostIdea>) => {
    setPostIdea((prev) => (prev ? { ...prev, ...updates } : null))
  }

  const updatePostContent = (updates: Partial<PostContent>) => {
    setPostContent((prev) => (prev ? { ...prev, ...updates } : null))
  }

  const reset = () => {
    setStep("type")
    setPostType("")
    setPostIdea(null)
    setPostContent(null)
    setLeadMagnet(null)
    setEmailContent(null)
  }

  return {
    step,
    postType,
    postIdea,
    postContent,
    leadMagnet,
    emailContent,
    isLoading,
    setPostType,
    updatePostIdea,
    updatePostContent,
    handleNextStep,
    handlePreviousStep,
    generateIdea,
    generateContent,
    generateLeadMagnet,
    generateEmailContent,
    reset,
  }
} 