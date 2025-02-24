import { get, post } from './client'
import type { HealthInquiry } from '../types/inquiry'

export async function submitInquiry(inquiry: Omit<HealthInquiry, 'id' | 'status' | 'submittedAt'>) {
  return post<HealthInquiry>('/inquiries', inquiry)
}

export async function getInquiry(id: string) {
  return get<HealthInquiry>(`/inquiries/${id}`)
} 