"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { NavHeader } from "@/components/nav-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ArrowLeft, X } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import Link from "next/link"
import type { TripSection } from "@/lib/types"

export default function ItineraryBuilderPage() {
  const params = useParams()
  const router = useRouter()
  const { trips, updateTrip } = useApp()
  const trip = trips.find((t) => t.id === params.id)

  const [sections, setSections] = useState<Omit<TripSection, "id">[]>([
    {
      title: "",
      description: "",
      dateRange: { start: "", end: "" },
      budget: 0,
      activities: [],
    },
  ])

  if (!trip) {
    return (
      <div className="min-h-screen">
        <NavHeader />
        <main className="container mx-auto px-4 py-8">
          <p>Trip not found</p>
        </main>
      </div>
    )
  }

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        description: "",
        dateRange: { start: "", end: "" },
        budget: 0,
        activities: [],
      },
    ])
  }

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const updateSection = (index: number, field: string, value: any) => {
    const newSections = [...sections]
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      newSections[index] = {
        ...newSections[index],
        [parent]: { ...((newSections[index] as any)[parent] || {}), [child]: value },
      }
    } else {
      newSections[index] = { ...newSections[index], [field]: value }
    }
    setSections(newSections)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newSections: TripSection[] = sections.map((section, index) => ({
      ...section,
      id: `section-${Date.now()}-${index}`,
    }))
    updateTrip(trip.id, {
      sections: [...trip.sections, ...newSections],
    })
    router.push(`/trips/${trip.id}`)
  }

  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/trips/${trip.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Trip
            </Link>
          </Button>
        </div>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold">Build Itinerary</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Section {sectionIndex + 1}</CardTitle>
                    {sections.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeSection(sectionIndex)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      placeholder="e.g., Exploration, Hotel Stay"
                      value={section.title}
                      onChange={(e) => updateSection(sectionIndex, "title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="All the necessary information about this section..."
                      value={section.description}
                      onChange={(e) => updateSection(sectionIndex, "description", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Date Range: Start</Label>
                      <Input
                        type="date"
                        value={section.dateRange.start}
                        onChange={(e) => updateSection(sectionIndex, "dateRange.start", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Date Range: End</Label>
                      <Input
                        type="date"
                        value={section.dateRange.end}
                        onChange={(e) => updateSection(sectionIndex, "dateRange.end", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Budget of this section</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={section.budget || ""}
                      onChange={(e) => updateSection(sectionIndex, "budget", Number(e.target.value))}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button type="button" variant="outline" className="w-full bg-transparent" onClick={addSection}>
              <Plus className="mr-2 h-4 w-4" />
              Add another Section
            </Button>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Save Itinerary
              </Button>
              <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
                <Link href={`/trips/${trip.id}`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
