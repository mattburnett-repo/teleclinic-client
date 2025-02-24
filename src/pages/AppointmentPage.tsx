import React from 'react'
import { useHealthInquiry } from '../context/HealthInquiryContext'
import { getDoctor } from '../api/doctors'
import type { Doctor } from '../types/doctor'

export function AppointmentPage() {
  const { inquiry, updateInquiry } = useHealthInquiry()
  const [doctor, setDoctor] = React.useState<Doctor>()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (inquiry.appointment?.doctorId) {
      getDoctor(inquiry.appointment.doctorId)
        .then(setDoctor)
        .finally(() => setLoading(false))
    }
  }, [inquiry.appointment?.doctorId])

  if (!doctor || !inquiry.appointment) {
    return null
  }

  const appointmentTime = new Date(inquiry.appointment.timeSlot).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Appointment Confirmed
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Your appointment has been scheduled
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.speciality}</p>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase">Appointment Time</h4>
            <p className="mt-1 text-lg text-gray-900">{appointmentTime}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase">Patient</h4>
            <p className="mt-1 text-lg text-gray-900">{inquiry.patientName}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase">Reason</h4>
            <p className="mt-1 text-lg text-gray-900">{inquiry.symptom}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => updateInquiry({ status: 'completed' })}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Patient Record
          </button>
        </div>
      </div>
    </div>
  )
} 