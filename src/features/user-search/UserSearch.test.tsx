import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { UserSearch } from './UserSearch'

describe('UserSearch', () => {
  it('показує поле пошуку', () => {
    const markup = renderToStaticMarkup(<UserSearch />)

    expect(markup).toContain('placeholder="Імʼя, email або роль"')
    expect(markup).toContain('Знайти')
  })

  it('не показує результати до введення запиту', () => {
    const markup = renderToStaticMarkup(<UserSearch />)

    expect(markup).not.toContain('Знайдено:')
    expect(markup).not.toContain('Нікого не знайдено')
  })

  it('блокує пошук для порожнього запиту', () => {
    const markup = renderToStaticMarkup(<UserSearch />)

    expect(markup).toContain('disabled=""')
  })

  it('не показує повідомлення про помилку на старті', () => {
    const markup = renderToStaticMarkup(<UserSearch />)

    expect(markup).not.toContain('class="error"')
  })
})
