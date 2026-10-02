import React from 'react'
import { Routes } from 'react-router'

import routes from './routes/AppRoutes'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './features/context/AuthContext'

const App = () => {
  return (
    <AuthProvider>

      <RouterProvider router={routes}/>
    </AuthProvider>
  )
}

export default App