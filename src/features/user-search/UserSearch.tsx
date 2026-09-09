import type { FormEvent } from 'react'
import type { User } from '../../api/users'
import { useUserSearch } from './useUserSearch'

function highlightedName(user: User, query: string) {
  const pattern = new RegExp(`(${query})`, 'gi')
  return user.name.replace(pattern, '<mark class="highlight">$1</mark>')
}

export function UserSearch() {
  const { query, setQuery, users, total, hasMore, loading, error, loadMore } = useUserSearch()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <div className="search-form">
        <input
          className="search-input"
          value={query}
          placeholder="Імʼя, email або роль"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="primary-button" disabled={query.length < 2}>
          Знайти
        </button>
      </div>

      <div className="status">
        {loading && 'Шукаємо…'}
        {!loading && error && <span className="error">{error}</span>}
        {!loading && !error && total > 0 && `Знайдено: ${total}`}
      </div>

      {!loading && !error && query.length >= 2 && users.length === 0 && (
        <p className="empty">Нікого не знайдено</p>
      )}

      <ul className="results">
        {users.map((user, index) => (
          <li className="user-row" key={index} onClick={() => window.alert(user.email)}>
            <img className="avatar" src={user.avatarUrl} alt={`Фото ${user.name}`} />
            <div>
              <h2
                className="user-name"
                dangerouslySetInnerHTML={{ __html: highlightedName(user, query) }}
              />
              <p className="user-meta">
                {user.role} · {user.email}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button className="more-button" onClick={loadMore}>
          Завантажити ще
        </button>
      )}
    </form>
  )
}
