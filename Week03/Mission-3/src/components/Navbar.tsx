import { NavLink } from 'react-router-dom'

const Links = [
    {to: '/', label: '홈'},
    {to: '/movies/popular', label: '인기 영화'},
    {to: '/movies/now_playing', label: '현재 상영 영화'},
    {to: '/movies/top_rated', label: '평점 높은 영화'},
    {to: '/movies/upcoming', label: '개봉 예정 영화'},
]

const NavBar = () => {
  return (
    <nav className='bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-2xl sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* 로고 */}
          <div className='flex-shrink-0'>
            <span className='text-2xl font-bold text-red-600'>🎥 MovieDB</span>
          </div>
          
          {/* 네비게이션 링크들 */}
          <div className='flex gap-1'>
            {Links.map(({to, label}) => (
              <NavLink
                key={to} 
                to={to} 
                className={({isActive}) => {
                  return isActive 
                    ? 'px-4 py-2 rounded-lg bg-red-600 text-white font-bold text-base transition-all duration-300 shadow-lg' 
                    : 'px-4 py-2 rounded-lg text-gray-300 text-base hover:text-white hover:bg-gray-800 transition-all duration-300';
                }}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
