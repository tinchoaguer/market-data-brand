import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrandStudio } from './brand/BrandStudio.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrandStudio />
  </StrictMode>,
)
