import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ContextProvider } from './context'
import Home from './pages/Home'
import Detalhes from './pages/Detalhes'
import ErrorPage from './pages/ErrorPage'
import Favoritos from './pages/Favoritos'
import './index.css'

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
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
)
