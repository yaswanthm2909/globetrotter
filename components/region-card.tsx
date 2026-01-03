import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Region } from "@/lib/types"

interface RegionCardProps {
  region: Region
}

export function RegionCard({ region }: RegionCardProps) {
  return (
    <Link href={`/search?region=${region.name}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={region.image || "/placeholder.svg"}
              alt={region.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white">{region.name}</h3>
              <p className="text-sm text-white/80">{region.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
