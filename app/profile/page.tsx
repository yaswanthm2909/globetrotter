"use client"

import { useState } from "react"
import Image from "next/image"
import { NavHeader } from "@/components/nav-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TripCard } from "@/components/trip-card"
import { Edit2, Save } from "lucide-react"
import { useApp } from "@/lib/context/app-context"

export default function ProfilePage() {
  const { user, trips } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  if (!user) {
    return (
      <div className="min-h-screen">
        <NavHeader />
        <main className="container mx-auto px-4 py-8">
          <p>Please log in to view your profile</p>
        </main>
      </div>
    )
  }

  const preplannedTrips = trips.filter((t) => t.status === "upcoming")
  const previousTrips = trips.filter((t) => t.status === "completed")

  const handleSave = () => {
    // In production, this would update the user profile
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">User Profile</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* User Details Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-border">
                  <Image
                    src={user.avatar || "/placeholder.svg?height=128&width=128"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsEditing(true)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trips Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="preplanned" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preplanned">Preplanned Trips ({preplannedTrips.length})</TabsTrigger>
                <TabsTrigger value="previous">Previous Trips ({previousTrips.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="preplanned" className="mt-6">
                {preplannedTrips.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground">No upcoming trips planned yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {preplannedTrips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="previous" className="mt-6">
                {previousTrips.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground">No previous trips yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {previousTrips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
