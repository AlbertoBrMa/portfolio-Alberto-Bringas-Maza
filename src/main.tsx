import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!
// Marca para el capturador de errores de index.html: si esto llegó a
// ejecutarse, el módulo se cargó y evaluó correctamente.
rootEl.setAttribute('data-app-mounted', '1')

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
