import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from '../mocks/handlers'
import { searchUsers } from './users'

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('searchUsers', () => {
  it('повертає справжні сторінки без повторів', async () => {
    const firstPage = await searchUsers({ query: 'Engineer', page: 1 })
    const secondPage = await searchUsers({ query: 'Engineer', page: 2 })
    const thirdPage = await searchUsers({ query: 'Engineer', page: 3 })
    const ids = [...firstPage.items, ...secondPage.items, ...thirdPage.items].map(({ id }) => id)

    expect(firstPage).toMatchObject({ page: 1, pageSize: 8, total: 18, hasMore: true })
    expect(secondPage).toMatchObject({ page: 2, pageSize: 8, total: 18, hasMore: true })
    expect(thirdPage).toMatchObject({ page: 3, pageSize: 8, total: 18, hasMore: false })
    expect(new Set(ids).size).toBe(18)
  })

  it('фільтрує каталог за імʼям та email', async () => {
    const result = await searchUsers({ query: 'Ірина.Коваль', page: 1 })

    expect(result.total).toBe(1)
    expect(result.items[0]).toMatchObject({ name: 'Ірина Коваль' })
  })

  it('повертає жіночі та чоловічі портрети відповідно до імен', async () => {
    const women = await searchUsers({ query: 'Софія', page: 1 })
    const men = await searchUsers({ query: 'Ігор', page: 1 })

    expect(women.items.every(({ avatarUrl }) => avatarUrl.includes('/women/'))).toBe(true)
    expect(men.items.every(({ avatarUrl }) => avatarUrl.includes('/men/'))).toBe(true)
  })

  it('повертає повідомлення mock backend для помилки', async () => {
    await expect(searchUsers({ query: 'помилка', page: 1 })).rejects.toThrow(
      'Сервіс пошуку тимчасово недоступний',
    )
  })
})
