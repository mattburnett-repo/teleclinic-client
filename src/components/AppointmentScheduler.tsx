import React from 'react'

type AppointmentSchedulerProps = {
  doctorId: string
  timeSlots: string[]
}

export function AppointmentScheduler({ doctorId, timeSlots }: AppointmentSchedulerProps) {
  const [confirmed, setConfirmed] = React.useState(false)

  const handleBooking = () => {
    setConfirmed(true)
  }

  return (
    <div>
      {timeSlots.map(slot => (
        <button key={slot}>
          {new Date(slot).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </button>
      ))}
      <button onClick={handleBooking}>Book Appointment</button>
      {confirmed && <div>Appointment confirmed</div>}
    </div>
  )
} 