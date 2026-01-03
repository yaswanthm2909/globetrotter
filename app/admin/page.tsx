"use client"

import { NavHeader } from "@/components/nav-header"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApp } from "@/lib/context/app-context"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AdminPage() {
  const { user, trips, posts } = useApp()

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen">
        <NavHeader />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Access denied. Admin privileges required.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // Mock analytics data
  const popularCities = [
    { name: "Paris", visits: 156 },
    { name: "Tokyo", visits: 134 },
    { name: "New York", visits: 128 },
    { name: "London", visits: 98 },
    { name: "Bali", visits: 87 },
  ]

  const popularActivities = [
    { name: "Sightseeing", count: 245 },
    { name: "Food Tours", count: 189 },
    { name: "Museums", count: 156 },
    { name: "Beach", count: 134 },
    { name: "Hiking", count: 98 },
  ]

  const userTrends = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 145 },
    { month: "Mar", users: 168 },
    { month: "Apr", users: 192 },
    { month: "May", users: 215 },
    { month: "Jun", users: 238 },
  ]

  const tripDistribution = [
    { name: "Upcoming", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Ongoing", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Completed", value: 30, color: "hsl(var(--chart-3))" },
  ]

  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Admin Panel</h1>

        <div className="mb-8">
          <SearchBar showFilters={false} placeholder="Search analytics..." />
        </div>

        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="manage">Manage Users</TabsTrigger>
            <TabsTrigger value="cities">Popular Cities</TabsTrigger>
            <TabsTrigger value="activities">Popular Activities</TabsTrigger>
            <TabsTrigger value="trends">User Trends and Analytics</TabsTrigger>
          </TabsList>

          {/* Manage Users Tab */}
          <TabsContent value="manage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold">{trips.length}</div>
                        <p className="text-sm text-muted-foreground">Total Trips</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold">{posts.length}</div>
                        <p className="text-sm text-muted-foreground">Community Posts</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold">238</div>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                      </CardContent>
                    </Card>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This Section is manageable for the managing the users and their actions
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Popular Cities Tab */}
          <TabsContent value="cities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Cities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  List of all the popular cities where the users are visiting based on the current user trends.
                </p>
                <ChartContainer
                  config={{
                    visits: {
                      label: "Visits",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={popularCities}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="visits" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Popular Activities Tab */}
          <TabsContent value="activities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  List of all the popular activities that the users are doing based on the current user trends.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <ChartContainer
                    config={{
                      count: {
                        label: "Count",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={popularActivities} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis type="number" className="text-xs" />
                        <YAxis dataKey="name" type="category" className="text-xs" width={100} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="space-y-2">
                    {popularActivities.map((activity, index) => (
                      <div
                        key={activity.name}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{activity.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.count} times</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Trends Tab */}
          <TabsContent value="trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Trends and Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  This section will give the focus on the growing analytic metrics, various graphs and give detailed
                  information to the admin.
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Line Chart */}
                  <div>
                    <h3 className="mb-4 font-semibold">User Growth</h3>
                    <ChartContainer
                      config={{
                        users: {
                          label: "Users",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={userTrends}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="month" className="text-xs" />
                          <YAxis className="text-xs" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="users"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={2}
                            dot={{ fill: "hsl(var(--chart-1))" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>

                  {/* Pie Chart */}
                  <div>
                    <h3 className="mb-4 font-semibold">Trip Distribution</h3>
                    <ChartContainer
                      config={{
                        value: {
                          label: "Trips",
                        },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={tripDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name}: ${entry.value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {tripDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
