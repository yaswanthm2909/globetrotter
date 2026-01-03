"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { NavHeader } from "@/components/nav-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import Link from "next/link"

export default function EditTripPage() {
  const params = useParams()
  const router = useRouter()
  const { trips, updateTrip } = useApp()
  const trip = trips.find((t) => t.id === params.id)

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    if (trip) {
      setFormData({
        title: trip.title,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
      })
    }
  }, [trip])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateTrip(trip.id, formData)
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

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold">Edit Trip</h1>

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
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
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

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href={`/trips/${trip.id}`}>Cancel</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
