export const SYMPTOMS = {
  HEADACHE: { value: 'headache', label: 'Headache', speciality: 'Neurology' },
  MIGRAINE: { value: 'migraine', label: 'Migraine', speciality: 'Neurology' },
  BACK_PAIN: { value: 'backpain', label: 'Back Pain', speciality: 'Orthopedics' },
  JOINT_PAIN: { value: 'jointpain', label: 'Joint Pain', speciality: 'Orthopedics' },
  FEVER: { value: 'fever', label: 'Fever', speciality: 'Internal Medicine' },
  COUGH: { value: 'cough', label: 'Cough', speciality: 'Internal Medicine' },
  ANXIETY: { value: 'anxiety', label: 'Anxiety', speciality: 'Psychiatry' },
  DEPRESSION: { value: 'depression', label: 'Depression', speciality: 'Psychiatry' }
} as const

export type SymptomKey = keyof typeof SYMPTOMS
export type SymptomValue = (typeof SYMPTOMS)[SymptomKey]['value']
export type Symptom = {
  value: SymptomValue
  label: string
  speciality: string
} 