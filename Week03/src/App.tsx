import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home';
import NotFound from './pages/NotFound';
import MoviePage from './pages/MoviePage';
import RootLayout from './layout/root-layout';
// src/App.tsx 수정
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, 
        element: <HomePage />,
      },
      {
        path: 'movies/:category', 
        element: <MoviePage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;