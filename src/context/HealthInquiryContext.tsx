import React from 'react'
import type { SymptomKey } from '../constants/symptoms'
import { submitInquiry as submitInquiryApi } from '../api/inquiries'
import { ApiError } from '../api/client'

export interface HealthInquiry {
  id?: string
  patientName: string
  symptom: SymptomKey | ''
  status: 'draft' | 'submitting' | 'submitted' | 'matched' | 'scheduled' | 'confirmed' | 'completed'
  submittedAt?: Date
  error?: string
  appointment?: {
    doctorId: string
    timeSlot: string
    selected?: {
      doctorId: string
      timeSlot: string
    }
  }
}

interface HealthInquiryContextType {
  inquiry: HealthInquiry
  updateInquiry: (data: Partial<HealthInquiry>) => void
  submitInquiry: () => void
  resetInquiry: () => void
}

const defaultInquiry: HealthInquiry = {
  patientName: '',
  symptom: '',
  status: 'draft'
}

export const HealthInquiryContext = React.createContext<HealthInquiryContextType | null>(null)

export function HealthInquiryProvider({ 
  children,
  initialState = defaultInquiry 
}: { 
  children: React.ReactNode
  initialState?: HealthInquiry 
}) {
  const [inquiry, setInquiry] = React.useState<HealthInquiry>(initialState)

  const updateInquiry = (data: Partial<HealthInquiry>) => {
    setInquiry(prev => ({ ...prev, ...data }))
  }

  const submitInquiry = () => {
    if (!inquiry.symptom) return
    
    const data = {
      patientName: inquiry.patientName,
      symptoms: inquiry.symptom
    }
    
    setInquiry(prev => ({ ...prev, status: 'submitting' }))
    
    submitInquiryApi(data)
      .then(response => {
        setInquiry(prev => ({
          ...prev,
          id: response.id,
          status: 'submitted',
          submittedAt: new Date()
        }))
      })
      .catch(error => {
        setInquiry(prev => ({ ...prev, status: 'draft', error: error.message }))
      })
  }

  const resetInquiry = () => {
    setInquiry(defaultInquiry)
  }

  return (
    <HealthInquiryContext.Provider value={{ inquiry, updateInquiry, submitInquiry, resetInquiry }}>
      {children}
    </HealthInquiryContext.Provider>
  )
}

export function useHealthInquiry() {
  const context = React.useContext(HealthInquiryContext)
  if (!context) {
    throw new Error('useHealthInquiry must be used within a HealthInquiryProvider')
  }
  return context
} 