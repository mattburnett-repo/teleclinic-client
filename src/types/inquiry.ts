import type { SymptomKey } from '../constants/symptoms'

export interface HealthInquiry {
  id: string
  patientName: string
  symptom: SymptomKey
  status: 'draft' | 'submitted' | 'matched' | 'scheduled' | 'confirmed' | 'completed'
  submittedAt?: Date
  appointment?: {
    doctorId: string
    timeSlot: string
  }
} 