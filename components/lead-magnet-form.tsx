"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LeadMagnet } from "@/lib/api"

interface LeadMagnetFormProps {
  leadMagnet: LeadMagnet | null
  isLoading: boolean
  onGenerate: (type: LeadMagnet["type"]) => void
}

export function LeadMagnetForm({ leadMagnet, isLoading, onGenerate }: LeadMagnetFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Create Lead Magnet</h2>
      <Card>
        <CardHeader>
          <CardTitle>Lead Magnet Type</CardTitle>
          <CardDescription>Select the type of lead magnet you want to create</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {["guide", "playbook", "swipe-file", "flow-chart", "automation"].map((type) => (
              <Card
                key={type}
                className={`cursor-pointer transition-all hover:border-primary ${
                  leadMagnet?.type === type ? "border-2 border-primary" : ""
                }`}
                onClick={() => onGenerate(type as LeadMagnet["type"])}
              >
                <CardHeader>
                  <CardTitle className="capitalize">{type.replace("-", " ")}</CardTitle>
                  <CardDescription>
                    {type === "guide" && "Comprehensive guide on a specific topic"}
                    {type === "playbook" && "Step-by-step playbook for success"}
                    {type === "swipe-file" && "Collection of proven templates and examples"}
                    {type === "flow-chart" && "Visual representation of a process"}
                    {type === "automation" && "Automation setup guide or template"}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 