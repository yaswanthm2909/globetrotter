import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import type { Trip } from "@/lib/types"

interface TripCardProps {
  trip: Trip
  showViewButton?: boolean
}

export function TripCard({ trip, showViewButton = true }: TripCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {trip.coverImage ? (
            <Image
              src={trip.coverImage || "/placeholder.svg"}
              alt={trip.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-balance line-clamp-1">{trip.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{trip.destination}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </span>
          </div>
        </div>
      </CardContent>
      {showViewButton && (
        <CardFooter className="p-4 pt-0">
          <Button asChild variant="outline" className="w-full bg-transparent" size="sm">
            <Link href={`/trips/${trip.id}`}>View</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
