import { UserSearch } from './features/user-search/UserSearch'

export default function App() {
  return (
    <main className="app-shell">
      <p className="eyebrow">People</p>
      <h1>Команда продукту</h1>
      <p className="lede">Знайдіть колегу за імʼям, email або роллю.</p>
      <UserSearch />
    </main>
  )
}
