import type { SymptomKey } from '../constants/symptoms'

export interface Visit {
  id: string
  date: string
  doctorName: string
  doctorSpeciality: string
  symptom: SymptomKey
} 