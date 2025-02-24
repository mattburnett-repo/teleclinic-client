import React from 'react'
import { HealthInquiryPage } from './pages/HealthInquiryPage'
import { DoctorMatchPage } from './pages/DoctorMatchPage'
import { AppointmentPage } from './pages/AppointmentPage'
import { PatientRecordPage } from './pages/PatientRecordPage'
import { HealthInquiryProvider, useHealthInquiry } from './context/HealthInquiryContext'

function AppContent() {
  const { inquiry, resetInquiry, updateInquiry } = useHealthInquiry()

  const getBreadcrumbText = () => {
    switch (inquiry.status) {
      case 'submitted':
        return 'Back to Symptoms'
      case 'confirmed':
        return 'Back to Matching Doctors'
      case 'completed':
        return 'Back to Appointment'
      default:
        return 'Back'
    }
  }

  const handleBack = () => {
    if (inquiry.status === 'confirmed') {
      updateInquiry({ status: 'submitted' })
    } else if (inquiry.status === 'completed') {
      updateInquiry({ status: 'confirmed' })
    } else {
      updateInquiry({ status: 'draft' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-['Inter']">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-semibold text-blue-600 tracking-tight">TeleClinic</h1>
        </div>
      </header>
      {inquiry.status !== 'draft' && (
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start h-16">
              <div className="flex">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {getBreadcrumbText()}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="container mx-auto py-16 px-4 flex flex-col items-center">
        {inquiry.status === 'draft' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
                Online Health Consultation
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Tell us about your symptoms and we'll match you with a qualified doctor.
              </p>
            </div>
            <HealthInquiryPage />
          </>
        )}
        {inquiry.status === 'submitted' && (
          <DoctorMatchPage />
        )}
        {inquiry.status === 'confirmed' && (
          <AppointmentPage />
        )}
        {inquiry.status === 'completed' && (
          <PatientRecordPage />
        )}
      </main>
    </div>
  )
}

export function App() {
  return (
    <HealthInquiryProvider>
      <AppContent />
    </HealthInquiryProvider>
  )
} 