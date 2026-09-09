import { useEffect, useState } from 'react'
import { searchUsers, type User } from '../../api/users'

export function useUserSearch() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query.length < 2) {
      setLoading(false)
      return
    }

    window.setTimeout(async () => {
      setLoading(true)

      try {
        const response = await searchUsers({ query, page })

        setUsers(response.items)
        setTotal(response.total)
        setHasMore(response.hasMore)
      } catch (requestError) {
        const message =
          requestError instanceof Error ? requestError.message : 'Не вдалося виконати пошук'
        setError(message)
      } finally {
        setLoading(false)
      }
    }, 300)
  }, [query, page])

  function loadMore() {
    setPage(page + 1)
  }

  return {
    query,
    setQuery,
    users,
    total,
    hasMore,
    loading,
    error,
    loadMore,
  }
}
