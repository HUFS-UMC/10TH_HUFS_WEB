import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomeLayout from './layouts/HomeLayout';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {path:'/', element: <HomePage />},
      {path:'login', element: <LoginPage />},
      {path:'signup', element: <SignupPage />},
      {path: 'my', element: <MyPage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;