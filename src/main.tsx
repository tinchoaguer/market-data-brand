import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LogoLab } from './brand/LogoLab.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LogoLab />
  </StrictMode>,
)
