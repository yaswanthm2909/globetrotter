"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, Trip, CommunityPost, Region, RegisterData } from "@/lib/types"

interface AppContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  trips: Trip[]
  addTrip: (trip: Omit<Trip, "id" | "userId" | "createdAt" | "updatedAt">) => void
  updateTrip: (id: string, trip: Partial<Trip>) => void
  deleteTrip: (id: string) => void
  posts: CommunityPost[]
  addPost: (post: Omit<CommunityPost, "id" | "userId" | "userName" | "userAvatar" | "createdAt">) => void
  likePost: (postId: string) => void
  regions: Region[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Mock data
const mockRegions: Region[] = [
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

const mockUser: User = {
  id: "1",
  email: "traveler@globaltrotter.com",
  name: "Alex Explorer",
  avatar: "/traveler-avatar.png",
  isAdmin: true, // Set to true to enable admin access
}

const mockTrips: Trip[] = [
  {
    id: "1",
    userId: "1",
    title: "Paris Adventure",
    destination: "Paris, France",
    status: "completed",
    startDate: "2024-01-05",
    endDate: "2024-01-15",
    sections: [
      {
        id: "s1",
        title: "Exploration",
        description: "Visit iconic landmarks",
        dateRange: { start: "2024-01-05", end: "2024-01-10" },
        budget: 2000,
        activities: [
          { id: "a1", name: "Eiffel Tower", description: "Visit the icon", expense: 100, day: 1 },
          { id: "a2", name: "Louvre Museum", description: "Art exploration", expense: 150, day: 2 },
        ],
      },
    ],
    coverImage: "/paris-streets.jpg",
    createdAt: "2023-12-01",
    updatedAt: "2024-01-16",
  },
  {
    id: "2",
    userId: "1",
    title: "NYC Getaway",
    destination: "New York, USA",
    status: "upcoming",
    startDate: "2026-02-15",
    endDate: "2026-02-22",
    sections: [],
    coverImage: "/new-york-skyline-night.jpg",
    createdAt: "2025-12-15",
    updatedAt: "2025-12-15",
  },
]

const mockPosts: CommunityPost[] = [
  {
    id: "1",
    userId: "1",
    userName: "Alex Explorer",
    userAvatar: "/diverse-user-avatars.png",
    tripId: "1",
    tripTitle: "Paris Adventure",
    content:
      "Just visited the Eiffel Tower at sunset. Absolutely breathtaking! The golden hour light made everything magical.",
    images: ["/eiffel-tower-sunset.jpg"],
    likes: 42,
    comments: 8,
    createdAt: "2024-01-07T18:30:00Z",
  },
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts)
  const [regions] = useState<Region[]>(mockRegions)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    if (email && password) {
      setUser(mockUser)
      return true
    }
    return false
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Mock registration - in production, this would call an API
    if (userData.email && userData.firstName && userData.lastName) {
      // In production, this would create a new user in the database
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const addTrip = (trip: Omit<Trip, "id" | "userId" | "createdAt" | "updatedAt">) => {
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(),
      userId: user?.id || "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTrips([...trips, newTrip])
  }

  const updateTrip = (id: string, updatedTrip: Partial<Trip>) => {
    setTrips(
      trips.map((trip) => (trip.id === id ? { ...trip, ...updatedTrip, updatedAt: new Date().toISOString() } : trip)),
    )
  }

  const deleteTrip = (id: string) => {
    setTrips(trips.filter((trip) => trip.id !== id))
  }

  const addPost = (post: Omit<CommunityPost, "id" | "userId" | "userName" | "userAvatar" | "createdAt">) => {
    const newPost: CommunityPost = {
      ...post,
      id: Date.now().toString(),
      userId: user?.id || "1",
      userName: user?.name || "Anonymous",
      userAvatar: user?.avatar,
      createdAt: new Date().toISOString(),
    }
    setPosts([newPost, ...posts])
  }

  const likePost = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  // Auto-login for demo purposes
  useEffect(() => {
    setUser(mockUser)
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
        posts,
        addPost,
        likePost,
        regions,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
