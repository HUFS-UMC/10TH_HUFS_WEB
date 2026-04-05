import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

//router 사용
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,  // 경로에 맞는 홈 레이아웃 보여주기
    errorElement: <NotFoundPage />,  // 경로에 맞는 페이지가 없을 때 보여주는 페이지,
    children: [
      {index: true, element: <HomePage />}, //path: '/' 중복되므로 index: true로 설정 후 홈페이지 보여주기
      {path: 'login', element: <LoginPage />},  // 경로가 login 일 때 로그인 페이지 보여주기
      {path: 'signup', element: <SignupPage />}  // signup 일 때 회원가입 페이지 보여주기
    ]
  },
]);

// router를 연결하여 경로에 맞는 페이지 보여주는 컴포넌트
function App() {
  return <RouterProvider router={router} />
}

export default App
