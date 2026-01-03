export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isAdmin?: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  country: string
  additionalInfo?: string
  photo?: File | null
}

export interface TripSection {
  id: string
  title: string
  description: string
  dateRange: {
    start: string
    end: string
  }
  budget: number
  activities: Activity[]
}

export interface Activity {
  id: string
  name: string
  description: string
  expense: number
  day: number
}

export interface Trip {
  id: string
  userId: string
  title: string
  destination: string
  status: "ongoing" | "upcoming" | "completed"
  startDate: string
  endDate: string
  sections: TripSection[]
  coverImage?: string
  createdAt: string
  updatedAt: string
}

export interface CommunityPost {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  tripId: string
  tripTitle: string
  content: string
  images: string[]
  likes: number
  comments: number
  createdAt: string
}

export interface Region {
  id: string
  name: string
  image: string
  description: string
}
