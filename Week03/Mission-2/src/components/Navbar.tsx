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
    <div className='flex gap-3 p-4'>
        {Links.map(({to, label}) => (
            <NavLink
            key={to} 
            to={to} 
            className={({isActive}) => {
                return isActive ? 'text-blue-500 text-lg font-bold' : 'text-gray-500 text-lg';
            }}
            >
                {label}
            </NavLink>
        ))}
    </div>
  )
}

export default NavBar
