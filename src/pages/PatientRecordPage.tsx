import React from 'react'
import { useHealthInquiry } from '../context/HealthInquiryContext'
import { getDoctor } from '../api/doctors'
import { getPatientVisits } from '../api/visits'
import type { Doctor } from '../types/doctor'
import type { Visit } from '../types/visit'
import { ApiError } from '../api/client'

export function PatientRecordPage() {
  const { inquiry, resetInquiry } = useHealthInquiry()
  const [doctor, setDoctor] = React.useState<Doctor>()
  const [pastVisits, setPastVisits] = React.useState<Visit[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string>()

  React.useEffect(() => {
    if (inquiry.appointment?.doctorId) {
      setLoading(true)
      Promise.all([
        getDoctor(inquiry.appointment.doctorId),
        getPatientVisits(inquiry.id!)
      ])
        .then(([doctorData, visitsData]) => {
          setDoctor(doctorData)
          setPastVisits(visitsData)
        })
        .catch((err: ApiError) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [inquiry.appointment?.doctorId, inquiry.id])

  if (!doctor || !inquiry.appointment) {
    return (
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {loading ? (
            <div role="status" className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <p>No appointment found</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Patient Record
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Recent Appointment</h3>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{doctor.name}</p>
                  <p className="text-gray-600">{doctor.speciality}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">Reason: {inquiry.symptom}</p>
                <p className="text-gray-600">
                  Date: {new Date(inquiry.appointment.timeSlot).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Past Visits</h3>
          {pastVisits.map(visit => (
            <div key={visit.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{visit.doctorName}</p>
                  <p className="text-gray-600">{visit.doctorSpeciality}</p>
                </div>
                <p className="text-gray-600">{visit.date}</p>
              </div>
              <p className="mt-2 text-gray-600">Reason: {visit.symptom}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => resetInquiry()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start New Consultation
          </button>
        </div>
      </div>
    </div>
  )
} 