import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {path: 'v1/auth/google/callback', element: <GoogleLoginRedirectPage />},      
    ],
  },
]

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/my", element: <MyPage /> },
    ],    
  },
]

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

// queryClient 세팅
export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>  
    {/*DEV 환경일 때만 켜겠다. 배포할 때 같이 들어가는 것 방지*/}      
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false}/>} 
    </QueryClientProvider>
  );
}

export default App;