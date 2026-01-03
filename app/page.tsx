import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { NavHeader } from "@/components/nav-header"
import { SearchBar } from "@/components/search-bar"
import { RegionCard } from "@/components/region-card"
import { TripCard } from "@/components/trip-card"
import { Plus } from "lucide-react"

// Mock data - will be replaced with actual data from context
const regions = [
  {
    id: "1",
    name: "Paris",
    image: "/paris-eiffel-tower.png",
    description: "The City of Light",
  },
  {
    id: "2",
    name: "Tokyo",
    image: "/tokyo-skyline-night.png",
    description: "Modern meets traditional",
  },
  {
    id: "3",
    name: "New York",
    image: "/nyc-skyline-twilight.png",
    description: "The city that never sleeps",
  },
  {
    id: "4",
    name: "London",
    image: "/london-big-ben.png",
    description: "Historic charm",
  },
  {
    id: "5",
    name: "Bali",
    image: "/bali-beach-temple.jpg",
    description: "Tropical paradise",
  },
]

const previousTrips = [
  {
    id: "1",
    userId: "1",
    title: "Paris Adventure",
    destination: "Paris, France",
    status: "completed" as const,
    startDate: "2024-01-05",
    endDate: "2024-01-15",
    sections: [],
    coverImage: "/paris-streets.jpg",
    createdAt: "2023-12-01",
    updatedAt: "2024-01-16",
  },
  {
    id: "2",
    userId: "1",
    title: "NYC Getaway",
    destination: "New York, USA",
    status: "upcoming" as const,
    startDate: "2026-02-15",
    endDate: "2026-02-22",
    sections: [],
    coverImage: "/new-york-skyline-night.jpg",
    createdAt: "2025-12-15",
    updatedAt: "2025-12-15",
  },
  {
    id: "3",
    userId: "1",
    title: "Tokyo Experience",
    destination: "Tokyo, Japan",
    status: "completed" as const,
    startDate: "2023-11-01",
    endDate: "2023-11-10",
    sections: [],
    coverImage: "/tokyo-skyline-night.png",
    createdAt: "2023-10-01",
    updatedAt: "2023-11-11",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavHeader />

      <main>
        {/* Banner Section */}
        <section className="relative h-[400px] w-full overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20">
          <div className="absolute inset-0">
            <Image src="/world-map-with-travel-destinations.jpg" alt="Banner" fill className="object-cover opacity-20" priority />
          </div>
          <div className="relative flex h-full items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-balance md:text-6xl">Discover Your Next Adventure</h1>
              <p className="mt-4 text-lg text-muted-foreground text-balance">
                Plan, explore, and share your travel experiences
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar />
          </div>

          {/* Top Regional Selections */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">Top Regional Selections</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {regions.map((region) => (
                <RegionCard key={region.id} region={region} />
              ))}
            </div>
          </section>

          {/* Previous Trips */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Previous Trips</h2>
              <Button asChild>
                <Link href="/trips/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Plan a Trip
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {previousTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
