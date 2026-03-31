import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies/popular', // 인기 영화
        element: <MoviePage />,
      },
      {
        path: 'movies/now_playing', // 현재 상영중
        element: <MoviePage />,
      },
      {
        path: 'movies/top_rated', // 높은 평점
        element: <MoviePage />,
      },
      {
        path: 'movies/upcoming', // 개봉 예정
        element: <MoviePage />,
      },
      {
        path: 'movies/:movieId', 
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;