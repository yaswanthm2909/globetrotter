"use client"

import { useParams, useRouter } from "next/navigation"
import { NavHeader } from "@/components/nav-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import Link from "next/link"

export default function TripDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { trips, deleteTrip } = useApp()
  const trip = trips.find((t) => t.id === params.id)

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

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this trip?")) {
      deleteTrip(trip.id)
      router.push("/trips")
    }
  }

  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/trips">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Trips
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/trips/${trip.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{trip.title}</h1>
          <p className="text-muted-foreground">
            {trip.destination} • {new Date(trip.startDate).toLocaleDateString()} -{" "}
            {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>

        {trip.sections.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-muted-foreground">No itinerary sections yet</p>
              <Button asChild>
                <Link href={`/trips/${trip.id}/itinerary`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Build Itinerary
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {trip.sections.map((section) => (
              <Card key={section.id}>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{section.title}</h3>
                  <p className="mb-4 text-muted-foreground">{section.description}</p>
                  <div className="flex gap-4 text-sm">
                    <span>
                      {new Date(section.dateRange.start).toLocaleDateString()} -{" "}
                      {new Date(section.dateRange.end).toLocaleDateString()}
                    </span>
                    <span className="text-muted-foreground">Budget: ${section.budget}</span>
                  </div>
                  {section.activities.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {section.activities.map((activity) => (
                        <div key={activity.id} className="rounded-lg border border-border p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{activity.name}</h4>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                              <p className="mt-1 text-sm text-muted-foreground">Day {activity.day}</p>
                            </div>
                            <span className="text-sm font-medium">${activity.expense}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            <Button asChild className="w-full">
              <Link href={`/trips/${trip.id}/itinerary`}>
                <Plus className="mr-2 h-4 w-4" />
                Add Another Section
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
