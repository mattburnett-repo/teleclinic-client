export interface Doctor {
  id: string
  name: string
  speciality: string
  imageUrl?: string
  availability: string[] // ISO date strings
  rating: number
  experience: number // years
} 