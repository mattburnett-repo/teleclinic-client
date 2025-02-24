import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AppointmentScheduler } from '../../../components/AppointmentScheduler'

describe('Appointment Scheduling', () => {
  const mockTimeSlots = [
    '2024-03-21T11:00:00Z',
    '2024-03-21T12:00:00Z'
  ]

  describe('AppointmentScheduler', () => {
    it('should display available time slots', () => {
      render(<AppointmentScheduler doctorId="doc-1" timeSlots={mockTimeSlots} />)
      
      expect(screen.getByText('12:00 PM')).toBeInTheDocument()
      expect(screen.getByText('01:00 PM')).toBeInTheDocument()
    })

    it('should book selected time slot', async () => {
      render(<AppointmentScheduler doctorId="doc-1" timeSlots={mockTimeSlots} />)
      
      fireEvent.click(screen.getByText('12:00 PM'))
      fireEvent.click(screen.getByRole('button', { name: /book appointment/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/appointment confirmed/i)).toBeInTheDocument()
      })
    })
  })
}) 