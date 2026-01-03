"use client"

import Link from "next/link"
import { NavHeader } from "@/components/nav-header"
import { SearchBar } from "@/components/search-bar"
import { TripCard } from "@/components/trip-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import { useState } from "react"

export default function TripsPage() {
  const { trips } = useApp()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const ongoingTrips = filteredTrips.filter((t) => t.status === "ongoing")
  const upcomingTrips = filteredTrips.filter((t) => t.status === "upcoming")
  const completedTrips = filteredTrips.filter((t) => t.status === "completed")

  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Trip Listing</h1>
          <Button asChild>
            <Link href="/trips/new">
              <Plus className="mr-2 h-4 w-4" />
              New Trip
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <SearchBar placeholder="Search trips..." onSearch={setSearchQuery} />
        </div>

        {/* Ongoing Trips */}
        {ongoingTrips.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Ongoing</h2>
            <div className="space-y-4">
              {ongoingTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{trip.title}</h3>
                        <p className="mt-1 text-muted-foreground">{trip.destination}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {new Date(trip.startDate).toLocaleDateString()} -{" "}
                          {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button asChild variant="outline" className="bg-transparent">
                        <Link href={`/trips/${trip.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Trips */}
        {upcomingTrips.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Up-coming</h2>
            <div className="space-y-4">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{trip.title}</h3>
                        <p className="mt-1 text-muted-foreground">{trip.destination}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {new Date(trip.startDate).toLocaleDateString()} -{" "}
                          {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button asChild variant="outline" className="bg-transparent">
                        <Link href={`/trips/${trip.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Completed Trips */}
        {completedTrips.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Completed</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        )}

        {filteredTrips.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-muted-foreground">
                {searchQuery ? "No trips match your search" : "No trips yet"}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link href="/trips/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Trip
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
