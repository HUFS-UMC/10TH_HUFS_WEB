import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom"
import type { Movie, MovieResponse } from '../types/movie';
import axios from "axios";
import MovieCard from "../components/MovieCard";
import {LoadingSpinner} from "../components/LoadingSpinner";
const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  //1.laoding state
  const [isPending, setIsPending] = useState(false);
  //2. error state
  const [isError, setIsError] = useState(false);
  //3. page state
  const [page, setPage] = useState(1);

  const {category} = useParams<
  {category: string}>();
  
useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect((): void=>{
    const fetchMovies = async () => {
      setIsPending(true);
      try{
      const {data} = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setMovies(data.results);
      setIsPending(false);
    } catch {
      setIsError(true);
    } finally{
      setIsPending(false);
    }
  }
if (category) {
      fetchMovies();
    }
  }, [page, category]);


  if (isError) return <div className="text-white text-center mt-10">데이터를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <>
    <div className= "flex items-center justify-center gap-6 mt-5">
      <button 
      className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] 
      transition-all duration-200 disabled:bg-gray-300
      cursor-pointer disabled:cursor-not-allowed'
      disabled={page === 1}
      onClick={(): void => setPage((prev): number => prev -1)}>
      {`<`}
      </button>
      <span>{page}페이지</span>
      <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover: bg-[#b2dab1] 
      transition-all duration-200'onClick={(): void => setPage((prev): number => prev +1)}>
      {`>`}
      </button>
    </div>
    {isPending && (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    )}
    <div className="p-10 grid gap-4 gird-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:
grid-cols-5 xl: grid-cols-6">
    {movies.map((movie) => (
      <MovieCard key = {movie.id} movie={movie} />
    ))}
    </div>
    </>
  )
};

export default MoviesPage;