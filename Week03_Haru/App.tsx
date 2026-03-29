import './App.css'
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MoviePage from './pages/MoviePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [{
      path: 'movies/:category',
      element: <MoviePage />,
    }
  ],
  },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;