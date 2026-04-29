import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import './App.css'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import HomeLayout from './layouts/HomeLayout';
import { AuthProvider } from './context/AuthContext';
import MyPage from './pages/MyPage';
import ProtectedLayout from './layouts/ProtectedLayout';

const publicRoutes: RouteObject[] =[
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <div>Home</div>},
      {path:'login', element: <Login />},
      {path:'signup', element: <SignupPage />},
    ],
  },
];

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

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;