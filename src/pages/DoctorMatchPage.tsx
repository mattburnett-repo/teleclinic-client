import React from 'react'
import { DoctorCard } from '../components/DoctorCard'
import { useHealthInquiry } from '../context/HealthInquiryContext'
import { SYMPTOMS } from '../constants/symptoms'
import { getDoctors } from '../api/doctors'
import { createAppointment } from '../api/appointments'
import type { Doctor } from '../types/doctor'
import { ApiError } from '../api/client'

export function DoctorMatchPage() {
  const { inquiry, updateInquiry } = useHealthInquiry()
  const [selectedSlot, setSelectedSlot] = React.useState<string | undefined>(() => inquiry.appointment?.timeSlot)
  const [selectedDoctor, setSelectedDoctor] = React.useState<string | undefined>(() => inquiry.appointment?.doctorId)
  const [doctors, setDoctors] = React.useState<Doctor[]>([])
  const [loading, setLoading] = React.useState(true)
  const [scheduling, setScheduling] = React.useState(false)
  const [error, setError] = React.useState<string>()

  const symptomSpeciality = inquiry.symptom ? SYMPTOMS[inquiry.symptom].speciality : ''
  
  React.useEffect(() => {
    if (symptomSpeciality) {
      setLoading(true)
      getDoctors(symptomSpeciality)
        .then(setDoctors)
        .catch((error: ApiError) => setError(error.message))
        .finally(() => setLoading(false))
    }
  }, [symptomSpeciality])

  const handleSelectSlot = (doctorId: string, slot: string) => {
    setSelectedDoctor(doctorId)
    setSelectedSlot(slot)
  }

  const handleScheduling = async () => {
    if (selectedDoctor && selectedSlot) {
      setScheduling(true)
      setError(undefined)
      
      try {
        await createAppointment({
          doctorId: selectedDoctor,
          inquiryId: inquiry.id!,
          time: selectedSlot
        })
        
        updateInquiry({
          status: 'confirmed',
          appointment: {
            doctorId: selectedDoctor,
            timeSlot: selectedSlot
          }
        })
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Failed to schedule appointment')
      } finally {
        setScheduling(false)
      }
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-8">
        <h2 
          data-testid="doctor-match-heading"
          className="text-3xl font-semibold text-gray-800 tracking-tight"
        >
          Matching Doctors
        </h2>
        {error ? (
          <p className="mt-4 text-red-600">
            Error: {error}
          </p>
        ) : (
          <p className="mt-4 text-xl text-gray-600">
            We found {doctors.length} available doctors specializing in {symptomSpeciality}
          </p>
        )}
      </div>
      
      {loading ? (
        <div role="status" className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${doctors.length === 1 ? 'md:grid-cols-1 max-w-xl mx-auto' : ''}`}>
          {doctors.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor}
              selectedSlot={doctor.id === selectedDoctor ? selectedSlot : undefined}
              onSelectSlot={(slot) => handleSelectSlot(doctor.id, slot)}
            />
          ))}
        </div>
      )}

      {selectedSlot && (
        <div className="mt-8 text-center">
          {error && (
            <p className="text-red-600 mb-4">{error}</p>
          )}
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleScheduling}
            disabled={scheduling}
          >
            {scheduling ? 'Scheduling...' : 'Continue to Scheduling'}
          </button>
        </div>
      )}
    </div>
  )
} 