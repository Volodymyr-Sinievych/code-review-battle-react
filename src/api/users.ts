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

const FIRST_NAMES = ['Ірина', 'Андрій', 'Олена', 'Ігор', 'Софія', 'Тарас']
const LAST_NAMES = ['Коваль', 'Шевченко', 'Бондар', 'Мельник', 'Ткаченко', 'Кравець']
const ROLES = ['Frontend Engineer', 'Product Designer', 'QA Engineer', 'Product Manager']
const PAGE_SIZE = 8

const users: User[] = Array.from({ length: 36 }, (_, index) => {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length]
  const lastName = LAST_NAMES[Math.floor(index / FIRST_NAMES.length)]
  const slug = `${firstName}.${lastName}`.toLowerCase()

  return {
    id: `user-${index + 1}`,
    name: `${firstName} ${lastName}`,
    email: `${slug}@example.com`,
    role: ROLES[index % ROLES.length],
    avatarUrl: `https://i.pravatar.cc/96?u=${index + 1}`,
  }
})

function wait(milliseconds: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, milliseconds)

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId)
        reject(new DOMException('Запит скасовано', 'AbortError'))
      },
      { once: true },
    )
  })
}

export async function searchUsers({
  query,
  page,
  signal,
}: SearchUsersParams): Promise<SearchUsersResponse> {
  const normalizedQuery = query.trim().toLocaleLowerCase('uk')
  const latency = Math.max(180, 900 - normalizedQuery.length * 120)

  await wait(latency, signal)

  if (normalizedQuery === 'помилка') {
    throw new Error('Сервіс пошуку тимчасово недоступний')
  }

  const matches = users.filter((user) =>
    [user.name, user.email, user.role].some((value) =>
      value.toLocaleLowerCase('uk').includes(normalizedQuery),
    ),
  )
  const start = (page - 1) * PAGE_SIZE
  const items = matches.slice(start, start + PAGE_SIZE)

  return {
    items,
    page,
    pageSize: PAGE_SIZE,
    total: matches.length,
    hasMore: start + PAGE_SIZE < matches.length,
  }
}
