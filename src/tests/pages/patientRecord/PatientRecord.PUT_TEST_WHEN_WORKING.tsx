import { render, screen } from '@testing-library/react'
import { PatientRecordPage } from '../../../pages/PatientRecordPage'
import { HealthInquiryProvider } from '../../../context/HealthInquiryContext'
import { getDoctor } from '../../../api/doctors'
import { getPatientVisits } from '../../../api/visits'
import type { SymptomKey } from '../../../constants/symptoms'

jest.mock('../../../api/doctors')
jest.mock('../../../api/visits')
const mockGetDoctor = getDoctor as jest.MockedFunction<typeof getDoctor>
const mockGetVisits = getPatientVisits as jest.MockedFunction<typeof getPatientVisits>

describe('PatientRecordPage', () => {
  beforeEach(() => {
    mockGetDoctor.mockReset()
    mockGetVisits.mockReset()
    // Default successful responses
    mockGetVisits.mockResolvedValue([])
  })

  it('should show loading state', () => {
    mockGetDoctor.mockImplementation(() => new Promise(() => {}))
    mockGetVisits.mockImplementation(() => new Promise(() => {}))
    
    render(
      <HealthInquiryProvider initialState={{
        id: 'patient-1',
        patientName: 'John Doe',
        symptom: 'HEADACHE' as SymptomKey,
        status: 'completed' as const,
        appointment: {
          doctorId: 'doc-1',
          timeSlot: '2024-03-21T09:00:00Z'
        }
      }}>
        <PatientRecordPage />
      </HealthInquiryProvider>
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should show error message when doctor fetch fails', async () => {
    mockGetDoctor.mockRejectedValue(new Error('Failed to load doctor'))
    
    render(
      <HealthInquiryProvider initialState={{
        id: 'patient-1',
        patientName: 'John Doe',
        symptom: 'HEADACHE' as SymptomKey,
        status: 'completed' as const,
        appointment: {
          doctorId: 'doc-1',
          timeSlot: '2024-03-21T09:00:00Z'
        }
      }}>
        <PatientRecordPage />
      </HealthInquiryProvider>
    )

    expect(await screen.findByText('Failed to load doctor')).toBeInTheDocument()
  })

  it('should show error message when visits fetch fails', async () => {
    mockGetDoctor.mockResolvedValue({
      id: 'doc-1',
      name: 'Dr. Smith',
      speciality: 'Neurology',
      imageUrl: '/images/doctor.jpg',
      rating: 4.5,
      experience: 10,
      availability: []
    })
    mockGetVisits.mockRejectedValue(new Error('Failed to load visits'))
    
    render(
      <HealthInquiryProvider initialState={{
        id: 'patient-1',
        patientName: 'John Doe',
        symptom: 'HEADACHE' as SymptomKey,
        status: 'completed' as const,
        appointment: {
          doctorId: 'doc-1',
          timeSlot: '2024-03-21T09:00:00Z'
        }
      }}>
        <PatientRecordPage />
      </HealthInquiryProvider>
    )

    expect(await screen.findByText('Failed to load visits')).toBeInTheDocument()
  })
}) 