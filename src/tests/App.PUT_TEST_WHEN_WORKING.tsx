import { render, screen } from '@testing-library/react'
import { App } from '../App'

describe('App', () => {
  it('should render the HealthInquiryForm', () => {
    render(<App />)
    expect(screen.getByText(/submit your inquiry/i)).toBeInTheDocument()
  })
}) 