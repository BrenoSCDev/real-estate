import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AuthProvider } from './contexts/Auth'
import { GlobalStyle } from './styles'
import './i18n/i18n'
import 'bootstrap/dist/css/bootstrap.min.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>  
    <AuthProvider>
      <GlobalStyle/>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
