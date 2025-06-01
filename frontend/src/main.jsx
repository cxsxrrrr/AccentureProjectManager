import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login';
// import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    {/* <App/> */}
  </StrictMode>,
)
