"use client"

import { useState } from "react"
import { NavHeader } from "@/components/nav-header"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import Link from "next/link"

export default function CalendarPage() {
  const { trips } = useApp()
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const getMonthData = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    return { firstDay, daysInMonth, year, month }
  }

  const { firstDay, daysInMonth, year, month } = getMonthData(currentDate)

  const getTripForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return trips.filter((trip) => {
      const tripStart = new Date(trip.startDate)
      const tripEnd = new Date(trip.endDate)
      const currentDateCheck = new Date(dateStr)
      return currentDateCheck >= tripStart && currentDateCheck <= tripEnd
    })
  }

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">Calendar View</h1>
            <SearchBar showFilters={true} />
          </div>

          <Card>
            <CardContent className="p-6">
              {/* Calendar Header */}
              <div className="mb-6 flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">
                  {monthNames[month]} {year}
                </h2>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Days of Week */}
              <div className="mb-2 grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="py-2 text-center text-sm font-semibold text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="aspect-square" />
                  }

                  const tripsOnDay = getTripForDate(day)
                  const hasTrips = tripsOnDay.length > 0

                  return (
                    <div
                      key={day}
                      className={`relative aspect-square rounded-lg border border-border p-2 transition-colors hover:bg-muted ${
                        hasTrips ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="text-sm font-medium">{day}</div>
                      {hasTrips && (
                        <div className="mt-1 space-y-1">
                          {tripsOnDay.slice(0, 2).map((trip) => (
                            <Link key={trip.id} href={`/trips/${trip.id}`}>
                              <div className="truncate rounded bg-primary px-1 py-0.5 text-xs text-primary-foreground">
                                {trip.title}
                              </div>
                            </Link>
                          ))}
                          {tripsOnDay.length > 2 && (
                            <div className="text-xs text-muted-foreground">+{tripsOnDay.length - 2} more</div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-primary/5 border border-border" />
              <span>Has scheduled trips</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
