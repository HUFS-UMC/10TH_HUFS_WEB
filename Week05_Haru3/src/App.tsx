import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import './App.css'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import HomeLayout from './layouts/HomeLayout';
import { AuthProvider } from './context/AuthContext';
import MyPage from './pages/MyPage';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const publicRoutes: RouteObject[] =[
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <div>Home</div>},
      {path:'login', element: <Login />},
      {path:'signup', element: <SignupPage />},
      {path: 'v1/auth/google/callback', element: <GoogleLoginRedirectPage />},
    ],
  },
]

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
    {
      path: 'my',
      element: <MyPage />,
    },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client ={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen = {false} />}
    </QueryClientProvider>
  )
}

export default App;