import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home';
import NotFound from './pages/NotFound';
import MoviePage from './pages/MoviePage';
import RootLayout from './layout/root-layout';
import MovieDetailPage from "./pages/MovieDetailPage" ;
import LoginPage from "./pages/LoginPage";
import SignupPage from './pages/SignupPage';
import ProtectedRoute from "./routes/ProtectedRoutes";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import {AuthProvider} from "./context/AuthContext";

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
      { element: <ProtectedRoute />,
        children: [
          {
            path: 'movies/:category', 
            element: <MoviePage />,
          },
          {
            path: 'movies/detail/:movieId', 
            element: <MovieDetailPage />
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path:"signup",
        element: <SignupPage />,
      },
      {
        path: "v1/auth/google/callback",
        element: <OAuthCallbackPage />,
      }
    ],
  },
]);
function App() {
  return (
    <AuthProvider>
  <RouterProvider router={router} />
  </AuthProvider>
);
}

export default App;