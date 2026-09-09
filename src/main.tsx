import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { enableMockBackend } from './mocks/enable-mock-backend'

async function bootstrap() {
  try {
    await enableMockBackend()
  } catch (error) {
    console.error('Не вдалося запустити mock backend', error)
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap()
