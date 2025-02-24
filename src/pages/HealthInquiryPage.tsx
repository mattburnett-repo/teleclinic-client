import React from 'react'
import { SYMPTOMS, type SymptomKey, type SymptomValue } from '../constants/symptoms'
import { useHealthInquiry } from '../context/HealthInquiryContext'

export function HealthInquiryPage() {
  const { inquiry, updateInquiry, submitInquiry } = useHealthInquiry()
  const [submitted, setSubmitted] = React.useState(false)
  const [errors, setErrors] = React.useState<string[]>([])

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    const newErrors = []
    if (!inquiry.patientName) newErrors.push('Name is required')
    if (!inquiry.symptom) newErrors.push('Symptoms are required')
    
    if (newErrors.length === 0) {
      setSubmitted(true)
      setErrors([])
      submitInquiry()
    } else {
      setErrors(newErrors)
      setSubmitted(false)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateInquiry({ patientName: value })
    if (value && errors.includes('Name is required')) {
      setErrors(errors.filter(error => error !== 'Name is required'))
    }
  }

  const handleSymptomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SymptomValue
    // Find the key (e.g., "HEADACHE") that matches the selected value
    const symptomKey = (Object.entries(SYMPTOMS).find(
      ([_, symptom]) => symptom.value === value
    )?.[0] as SymptomKey) || ''
    
    updateInquiry({ symptom: symptomKey })
    if (value && errors.includes('Symptoms are required')) {
      setErrors(errors.filter(error => error !== 'Symptoms are required'))
    }
  }

  return (
    <form 
      className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-200 hover:shadow-xl"
    >
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center tracking-tight">Submit Your Inquiry</h2>
      <label>
        <span className="block text-gray-600 text-sm font-medium mb-2">Name:</span>
        <input 
          type="text" 
          aria-label="name" 
          value={inquiry.patientName} 
          onChange={handleNameChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 text-gray-700 transform transition-all duration-200 hover:border-blue-300"
        />
        {errors.includes('Name is required') && (
          <div className="mb-4 text-red-500 text-sm animate-shake">
            Name is required
          </div>
        )}
      </label>
      <label>
        <span className="block text-gray-600 text-sm font-medium mb-2">Symptoms:</span>
        <select
          aria-label="symptoms" 
          value={inquiry.symptom ? SYMPTOMS[inquiry.symptom as keyof typeof SYMPTOMS].value : ''} 
          onChange={handleSymptomsChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 text-gray-700 transform transition-all duration-200 hover:border-blue-300 bg-white"
        >
          <option value="">Select your symptoms</option>
          {Object.values(SYMPTOMS).map(symptom => (
            <option key={symptom.value} value={symptom.value}>
              {symptom.label}
            </option>
          ))}
        </select>
        {errors.includes('Symptoms are required') && (
          <div className="mb-4 text-red-500 text-sm animate-shake">
            Symptoms are required
          </div>
        )}
      </label>
      <button 
        type="button" 
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-600 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 active:scale-[0.98]"
      >
        Submit
      </button>
      {submitted && (
        <div className="mt-6 p-3 bg-green-50 text-green-700 rounded-lg text-center font-medium animate-fadeIn">
          Inquiry submitted
        </div>
      )}
    </form>
  )
} 