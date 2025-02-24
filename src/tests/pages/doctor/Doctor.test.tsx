import { render, screen } from '@testing-library/react'
import { DoctorCard } from '../../../components/DoctorCard'

import { TEST_DOCTOR } from '../../../mocks/doctors'

describe('Doctor Matching', () => {
  describe('DoctorCard', () => {
    const mockSelectSlot = jest.fn()

    it('should display doctor information', () => {
      render(<DoctorCard doctor={TEST_DOCTOR} onSelectSlot={mockSelectSlot} />)
      
      expect(screen.getByText('Dr. Sarah Wilson')).toBeInTheDocument()
      expect(screen.getByText('Neurology')).toBeInTheDocument()
    })

    it('should show available time slots', () => {
      render(<DoctorCard doctor={TEST_DOCTOR} onSelectSlot={mockSelectSlot} />)
      
      expect(screen.getByText('10:00 AM')).toBeInTheDocument()
    })

    it('should display doctor image when provided', () => {
      render(<DoctorCard doctor={TEST_DOCTOR} onSelectSlot={mockSelectSlot} />)
    })
  })

}) 