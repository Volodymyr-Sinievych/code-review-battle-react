export interface User {
  id: string
  name: string
  email: string
  role: string
  avatarUrl: string
}

export interface SearchUsersParams {
  query: string
  page: number
  signal?: AbortSignal
}

export interface SearchUsersResponse {
  items: User[]
  page: number
  pageSize: number
  total: number
  hasMore: boolean
}

interface ApiError {
  message?: string
}

export async function searchUsers({
  query,
  page,
  signal,
}: SearchUsersParams): Promise<SearchUsersResponse> {
  const origin = typeof window === 'undefined' ? 'http://localhost' : window.location.origin
  const url = new URL(`${import.meta.env.BASE_URL}api/users`, origin)
  url.searchParams.set('query', query)
  url.searchParams.set('page', String(page))

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as ApiError
    throw new Error(error.message ?? `API повернуло статус ${response.status}`)
  }

  return (await response.json()) as SearchUsersResponse
}
