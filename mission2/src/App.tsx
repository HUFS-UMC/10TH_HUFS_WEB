import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          
          {/* 기본 화면 */}
          <Route index element={
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <h1 className="text-4xl font-black text-purple-600">🎬 MOVIE WORLD</h1>
              <p className="text-gray-500">상단 메뉴를 눌러 영화를 탐색해보세요!</p>
            </div>
          } />

          {/* 각 카테고리별 영화 목록 페이지 */}
          <Route path="movies/popular" element={<MoviePage />} />
          <Route path="movies/now_playing" element={<MoviePage />} />
          <Route path="movies/top_rated" element={<MoviePage />} />
          <Route path="movies/upcoming" element={<MoviePage />} />

          {/* 상세 페이지 */}
          <Route path="movies/:movieId" element={<MovieDetailPage />} />
        </Route>

        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;