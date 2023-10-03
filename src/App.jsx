import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'


import { CitiesProvider } from './contexts/CitiesContext.jsx'
import { AuthProvider } from './contexts/FakeAuthContext.jsx'

import CityList from './components/CityList.jsx'
import CountryList from './components/CountryList.jsx'
import City from './components/City.jsx'
import Form from './components/Form.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import SpinnerFullPage from './components/SpinnerFullPage.jsx'

const Homepage=lazy(()=>import('./pages/Homepage.jsx'))
const Product = lazy(() => import('./pages/Product.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'))
const AppLayout = lazy(() => import('./pages/AppLayout.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))

export default function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
      errorElement: <PageNotFound />
    },
    {
      path: 'product',
      element: <Product />
    },
    {
      path: 'pricing',
      element: <Pricing />
    },
    {
      path: 'app',
      element: <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>,
      children: [
        {
          index: true,
          element: <Navigate replace to='cities' />,
        }
        , {
          path: "cities",
          element: <CityList />,
        },
        {
          path: 'cities/:id',
          element: <City />
        },
        {
          path: "countries",
          element: <CountryList />
        },
        {
          path: "form",
          element: <Form />
        }
      ]
    },
    {
      path: 'login',
      element: <Login />
    }
  ])
  return (
    <AuthProvider>
      <CitiesProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  )
}
