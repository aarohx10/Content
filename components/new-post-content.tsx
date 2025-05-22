"use client"

import { ArrowRight, FileText, Lightbulb, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { usePostCreation } from "@/hooks/use-post-creation"
import { LeadMagnetForm } from "@/components/lead-magnet-form"

export function NewPostContent() {
  const {
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
  } = usePostCreation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-muted-foreground">Create a new LinkedIn post with AI assistance</p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep} disabled={step === "type"}>
          Back
        </Button>
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${step === "type" ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-2 w-2 rounded-full ${step === "idea" ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-2 w-2 rounded-full ${step === "content" ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-2 w-2 rounded-full ${step === "leadMagnet" ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-2 w-2 rounded-full ${step === "review" ? "bg-primary" : "bg-muted"}`} />
        </div>
        <Button onClick={handleNextStep} disabled={isLoading || step === "review" || (step === "type" && !postType)}>
          {step === "review" ? "Publish" : "Next"}
          {step !== "review" && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      {step === "type" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select Post Type</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                postType === "thought-leadership" ? "border-2 border-primary" : ""
              }`}
              onClick={() => setPostType("thought-leadership")}
            >
              <CardHeader>
                <CardTitle>Thought Leadership</CardTitle>
                <CardDescription>Share your expertise and insights on industry trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-20 items-center justify-center rounded-md bg-muted">
                  <Lightbulb className="h-10 w-10 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                postType === "case-study" ? "border-2 border-primary" : ""
              }`}
              onClick={() => setPostType("case-study")}
            >
              <CardHeader>
                <CardTitle>Case Study</CardTitle>
                <CardDescription>Share a success story or client case study</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-20 items-center justify-center rounded-md bg-muted">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                postType === "how-to" ? "border-2 border-primary" : ""
              }`}
              onClick={() => setPostType("how-to")}
            >
              <CardHeader>
                <CardTitle>How-To Guide</CardTitle>
                <CardDescription>Provide step-by-step instructions or tips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-20 items-center justify-center rounded-md bg-muted">
                  <Sparkles className="h-10 w-10 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === "idea" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generate Post Idea</h2>
          <Card>
            <CardHeader>
              <CardTitle>Post Topic</CardTitle>
              <CardDescription>Enter a topic or let AI generate ideas for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your post topic or idea..."
                  className="min-h-[100px]"
                  value={postIdea?.title || ""}
                  onChange={(e) =>
                    updatePostIdea({
                      title: e.target.value,
                    })
                  }
                />
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={generateIdea}
                    disabled={isLoading}
                  >
                    <Sparkles className="h-3 w-3" />
                    Generate Ideas
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled={isLoading}>
                Save as Draft
              </Button>
              <Button
                variant="outline"
                className="gap-1"
                onClick={generateIdea}
                disabled={isLoading}
              >
                <Sparkles className="h-4 w-4" />
                Refine Idea
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {step === "content" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Create Content</h2>
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Write your post or let AI generate content for you</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="write">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Post title (optional)"
                      className="font-medium"
                      value={postContent?.title || ""}
                      onChange={(e) =>
                        updatePostContent({
                          title: e.target.value,
                        })
                      }
                    />
                    <Textarea
                      placeholder="Write your post content here..."
                      className="min-h-[300px]"
                      value={postContent?.content || ""}
                      onChange={(e) =>
                        updatePostContent({
                          content: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={generateContent}
                      disabled={isLoading}
                    >
                      <Sparkles className="h-3 w-3" />
                      Generate Content
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="preview" className="pt-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-muted" />
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Just now · LinkedIn Post</p>
                      </div>
                    </div>
                    <div className="mt-4">{postContent?.content || "Your post preview will appear here..."}</div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {step === "leadMagnet" && (
        <LeadMagnetForm
          leadMagnet={leadMagnet}
          isLoading={isLoading}
          onGenerate={generateLeadMagnet}
        />
      )}

      {step === "review" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Review and Publish</h2>
          <Card>
            <CardHeader>
              <CardTitle>Final Review</CardTitle>
              <CardDescription>Review all content before publishing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium">LinkedIn Post</h3>
                  <div className="mt-2 rounded-lg border p-4">
                    <p className="font-medium">{postContent?.title}</p>
                    <p className="mt-2 whitespace-pre-wrap">{postContent?.content}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Lead Magnet</h3>
                  <div className="mt-2 rounded-lg border p-4">
                    <p className="font-medium">{leadMagnet?.title}</p>
                    <p className="mt-2 whitespace-pre-wrap">{leadMagnet?.content}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Email Content</h3>
                  <div className="mt-2 rounded-lg border p-4">
                    <p className="font-medium">{emailContent?.subject}</p>
                    <p className="mt-2 whitespace-pre-wrap">{emailContent?.body}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("leadMagnet")}>
                Back to Edit
              </Button>
              <Button onClick={generateEmailContent} disabled={isLoading}>
                Generate Email Content
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
