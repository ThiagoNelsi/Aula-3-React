import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './pages/Home'
import Detalhes from './pages/Detalhes'
import ErrorPage from './pages/ErrorPage'
import './index.css'
import Favoritos from './pages/Favoritos'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/detalhes/:id',
    element: <Detalhes />
  },
  {
    path: '/favoritos',
    element: <Favoritos />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
