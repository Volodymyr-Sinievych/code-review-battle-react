import { delay, http, HttpResponse } from 'msw'
import { searchUserDirectory } from './user-directory'

interface ErrorResponse {
  message: string
}

export const handlers = [
  http.get('*/api/users', async ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('query') ?? ''
    const page = Number(url.searchParams.get('page') ?? '1')

    if (!Number.isInteger(page) || page < 1) {
      return HttpResponse.json<ErrorResponse>(
        { message: 'Некоректний номер сторінки' },
        { status: 400 },
      )
    }

    const normalizedQuery = query.trim().toLocaleLowerCase('uk')
    const latency =
      import.meta.env.MODE === 'test' ? 0 : Math.max(180, 900 - normalizedQuery.length * 120)
    await delay(latency)

    if (normalizedQuery === 'помилка') {
      return HttpResponse.json<ErrorResponse>(
        { message: 'Сервіс пошуку тимчасово недоступний' },
        { status: 503 },
      )
    }

    return HttpResponse.json(searchUserDirectory(query, page))
  }),
]
