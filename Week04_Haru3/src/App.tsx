import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import HomeLayout from './layouts/HomeLayout';
import MyPage from './pages/MyPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {path:'/', element: <div>Home</div>},
      {path:'login', element: <Login />},
      {path:'signup', element: <SignupPage />},
      {path: 'my', element: <MyPage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;