import { post } from './client'
import type { Appointment } from '../types/appointment'

export async function createAppointment(data: { 
  doctorId: string
  inquiryId: string
  time: string 
}) {
  return post<Appointment>('/appointments', data)
} 