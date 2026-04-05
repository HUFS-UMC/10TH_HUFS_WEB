import './App.css';
import HomePage from './Pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './Pages/NotFoundPage';
import MoviePage from './Pages/MoviePage';
import MovieDetailPage from './Pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/category/:category',
        element: <MoviePage />
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;