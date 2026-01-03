"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NavHeader } from "@/components/nav-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import Link from "next/link"

export default function NewTripPage() {
  const router = useRouter()
  const { addTrip } = useApp()
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTrip({
      title: formData.title,
      destination: formData.destination,
      status: "upcoming",
      startDate: formData.startDate,
      endDate: formData.endDate,
      sections: [],
    })
    router.push("/trips")
  }

  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/trips">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Trips
            </Link>
          </Button>
        </div>

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold">Plan a New Trip</h1>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Trip Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Summer in Europe"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Select a Place</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Paris, France"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    Create Trip
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>

          {/* Suggestions Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Suggestion for Places to Visit/Activities to perform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-lg border border-border bg-muted"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
