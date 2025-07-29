import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/Router.jsx'
import { RouterProvider } from 'react-router'
import 'aos/dist/aos.css';
import Aos from 'aos'
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'

Aos.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <div className='font-urbanist max-w-6xl mx-auto'>
        <RouterProvider router={router} />
      </div>
      </AuthProvider>
  </StrictMode>,
)
