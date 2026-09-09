# Team Directory

Невеликий React/TypeScript застосунок для пошуку людей у продуктовій команді.

## Локальний запуск

```bash
npm install
npm run dev
```

Перевірки: `npm test`, `npm run lint`, `npm run build`.

## Mock API

Застосунок піднімає Mock Service Worker і виконує звичайні HTTP-запити до:

```text
GET /api/users?query=Engineer&page=1
```

Відповідь містить `items`, `page`, `pageSize`, `total` і `hasMore`. У каталозі 36 людей,
розмір сторінки — 8. Запит `Engineer` повертає 18 людей на трьох сторінках. Запит
`помилка` відтворює відповідь `503`.
