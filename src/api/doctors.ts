import { get } from './client'
import type { Doctor } from '../types/doctor'

export async function getDoctors(speciality: string) {
  return get<Doctor[]>(`/doctors?speciality=${speciality}`)
}

export async function getDoctor(id: string) {
  return get<Doctor>(`/doctors/${id}`)
} 