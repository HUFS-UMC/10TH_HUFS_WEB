import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home";
import NotFound from "./pages/NotFound";
import RootLayout from "./layouts/root-layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import LpDetailPage from "./pages/LpDetailPage";

import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MyPage from "./pages/MyPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "v1/auth/google/callback",
        element: <OAuthCallbackPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "lp/:lpId",
            element: <LpDetailPage />,
          },
          {
            path: "my",
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;