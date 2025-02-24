import { get } from './client'
import type { Visit } from '../types/visit'

export async function getPatientVisits(patientId: string) {
  return get<Visit[]>(`/patients/${patientId}/visits`)
} 