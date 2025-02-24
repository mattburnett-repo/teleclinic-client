import type { Doctor } from '../types/doctor'

export const MOCK_DOCTORS: Doctor[] = [
  // Neurology (3 doctors - well-staffed specialty)
  {
    id: 'doc-1',
    name: 'Dr. Sarah Wilson',
    speciality: 'Neurology',
    imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    availability: [
      '2024-03-21T09:00:00Z',
      '2024-03-21T10:00:00Z',
      '2024-03-21T14:00:00Z',
    ],
    rating: 4.8,
    experience: 12
  },
  {
    id: 'doc-9',
    name: 'Dr. Robert Martinez',
    speciality: 'Neurology',
    imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    availability: [
      '2024-03-21T12:00:00Z',
      '2024-03-21T16:00:00Z',
    ],
    rating: 4.7,
    experience: 8
  },
  // Orthopedics (1 doctor - understaffed specialty)
  {
    id: 'doc-3',
    name: 'Dr. James Rodriguez',
    speciality: 'Orthopedics',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    availability: [
      '2024-03-21T09:30:00Z',
      '2024-03-21T11:30:00Z',
    ],
    rating: 4.7,
    experience: 10
  },
  // Internal Medicine (4 doctors - most common specialty)
  {
    id: 'doc-5',
    name: 'Dr. David Kim',
    speciality: 'Internal Medicine',
    imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    availability: [
      '2024-03-21T10:30:00Z',
      '2024-03-21T14:30:00Z',
    ],
    rating: 4.8,
    experience: 11
  },
  {
    id: 'doc-10',
    name: 'Dr. John Murphy',
    speciality: 'Internal Medicine',
    imageUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
    availability: [
      '2024-03-21T09:00:00Z',
      '2024-03-21T13:00:00Z',
    ],
    rating: 4.8,
    experience: 16
  },
  {
    id: 'doc-11',
    name: 'Dr. Maria Garcia',
    speciality: 'Internal Medicine',
    imageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    availability: [
      '2024-03-21T11:00:00Z',
      '2024-03-21T15:00:00Z',
    ],
    rating: 4.9,
    experience: 13
  },
  // Psychiatry (2 doctors - normal staffing)
  {
    id: 'doc-7',
    name: 'Dr. Rachel Green',
    speciality: 'Psychiatry',
    imageUrl: 'https://randomuser.me/api/portraits/women/95.jpg',
    availability: [
      '2024-03-21T11:00:00Z',
      '2024-03-21T15:00:00Z',
    ],
    rating: 4.9,
    experience: 13
  },
  {
    id: 'doc-8',
    name: 'Dr. Marcus Webb',
    speciality: 'Psychiatry',
    imageUrl: 'https://randomuser.me/api/portraits/men/86.jpg',
    availability: [
      '2024-03-21T13:00:00Z',
      '2024-03-21T16:00:00Z',
    ],
    rating: 4.7,
    experience: 9
  }
]

export const TEST_DOCTOR = MOCK_DOCTORS[0] 