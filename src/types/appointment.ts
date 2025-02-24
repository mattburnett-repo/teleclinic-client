export interface Appointment {
  id: string
  doctorId: string
  patientId: string
  timeSlot: string
  status: 'scheduled' | 'completed' | 'cancelled'
} 