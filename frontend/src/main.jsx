import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
<<<<<<< Updated upstream
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
=======
import Login from './pages/Login'
import AdminLayout from './pages/AdminLayout'
// import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminLayout />
      {/* <Login /> */}
      {/* <App /> */}
    </BrowserRouter>
  </StrictMode>
>>>>>>> Stashed changes
)
