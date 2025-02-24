import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { HealthInquiryPage } from '../../../pages/HealthInquiryPage'
import { SYMPTOMS, type SymptomKey } from '../../../constants/symptoms'
import { HealthInquiryProvider } from '../../../context/HealthInquiryContext'
import { App } from '../../../App'

describe('HealthInquiryForm', () => {
  const renderWithProvider = () => {
    render(
      <HealthInquiryProvider>
        <HealthInquiryPage />
      </HealthInquiryProvider>
    )
  }

  it('should render all symptoms in dropdown', () => {
    renderWithProvider()
    
    const dropdown = screen.getByLabelText(/symptoms/i)
    fireEvent.click(dropdown)
    
    Object.values(SYMPTOMS).forEach(symptom => {
      expect(screen.getByText(symptom.label)).toBeInTheDocument()
    })
  })

  it('should submit form with selected symptom', async () => {
    renderWithProvider()
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    })
    
    fireEvent.change(screen.getByLabelText(/symptoms/i), {
      target: { value: SYMPTOMS.HEADACHE.value }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/inquiry submitted/i)).toBeInTheDocument()
    })
  })

  it('should show validation errors for empty form', () => {
    renderWithProvider()
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    
    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/symptoms are required/i)).toBeInTheDocument()
  })

  it('should show validation error for empty symptom selection', () => {
    renderWithProvider()
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    
    expect(screen.getByText(/symptoms are required/i)).toBeInTheDocument()
  })

  it('should update selected symptom when choosing from dropdown', () => {
    renderWithProvider()
    
    const dropdown = screen.getByLabelText(/symptoms/i)
    
    fireEvent.change(dropdown, {
      target: { value: SYMPTOMS.HEADACHE.value }
    })
    
    expect(dropdown).toHaveValue(SYMPTOMS.HEADACHE.value)
  })
}) 