import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root MIA');
}

createRoot(rootEl).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>,
)
