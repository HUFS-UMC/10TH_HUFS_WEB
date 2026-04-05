import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
// HomePage나 LoginPage가 있다면 여기서 import해줘!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로는 일단 회원가입으로 리다이렉트하거나 홈으로 설정해줘 */}
        <Route path="/" element={<div className="p-10 text-center text-2xl font-bold">홈 화면이야! 🏠</div>} />
        
        {/* 이번 미션의 핵심 경로! */}
        <Route path="/signup" element={<SignupPage />} />
        
        {/* 잘못된 경로로 들어오면 홈으로 보내버리기 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App