import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home';
import NotFound from './pages/NotFound';
import MoviePage from './pages/MoviePage';
import RootLayout from './layout/root-layout';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <HomePage />,
    element: <RootLayout />,
    errorElement: <NotFound />,
        children: [
      {
        // 2) index: true → 부모의 기본 경로('/')일 때 렌더
        index: true,
        element: <HomePage />,
      },
      {
        // 3) 부모가 '/'이므로, 'movies'만 써도 '/movies'로 매칭
        path: 'movies/:movieId',
        element: <MoviePage />,
      },
    ],
  },
  {
    path: '/movies',
    element: <MoviePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;