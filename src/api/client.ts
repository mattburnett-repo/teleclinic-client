const API_BASE = import.meta.env.VITE_API_URL

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

interface ApiErrorResponse {
  message?: string
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiErrorResponse = await response.json().catch(() => ({}))
    throw new ApiError(response.status, error.message || 'An error occurred')
  }
  return response.json().catch(() => null) as T
}

export async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`)
  return handleResponse<T>(response)
}

export async function post<T>(path: string, data: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return handleResponse<T>(response)
}

export async function put<T>(path: string, data: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return handleResponse<T>(response)
} 