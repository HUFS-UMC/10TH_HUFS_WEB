import { Outlet } from "react-router-dom"
import NavBar from "../components/Navbar"


const HomePage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200'>
      <NavBar />

      <main className='relative'>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-800/30 to-transparent' />
        <Outlet />
      </main>

      <footer className='px-6 py-8 text-center text-xs text-slate-500'>
        TMDB API 기반 영화 정보 서비스
      </footer>
    </div>
  )
}

export default HomePage
