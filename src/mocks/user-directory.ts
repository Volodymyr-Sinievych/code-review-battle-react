import type { SearchUsersResponse, User } from '../api/users'

const FIRST_NAMES = ['Ірина', 'Андрій', 'Олена', 'Ігор', 'Софія', 'Тарас']
const LAST_NAMES = ['Коваль', 'Шевченко', 'Бондар', 'Мельник', 'Ткаченко', 'Кравець']
const ROLES = ['Frontend Engineer', 'Product Designer', 'QA Engineer', 'Product Manager']
const PAGE_SIZE = 8

export const userDirectory: User[] = Array.from({ length: 36 }, (_, index) => {
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

export function searchUserDirectory(query: string, page: number): SearchUsersResponse {
  const normalizedQuery = query.trim().toLocaleLowerCase('uk')
  const matches = userDirectory.filter((user) =>
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
