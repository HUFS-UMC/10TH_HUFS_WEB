import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom"
import type {MovieResponse} from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieCard from "../components/MovieCard";
import {LoadingSpinner} from "../components/LoadingSpinner";
const MoviesPage = () => {
  const [page, setPage] = useState(1);

  const {category} = useParams<
  {category: string}>();
  
useEffect(() => {
    setPage(1);
  }, [category]);
  
  const url = category
    ?`/movie/${category}?language=ko-KR&page=${page}`
    :null;
  const {data, isLoading, isError, errorMessage} = 
    useCustomFetch<MovieResponse>(url);
  const movies = data?.results ?? [];


  if (isError) return <div className="text-white text-center mt-10">{errorMessage}</div>;

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
      <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] 
      transition-all duration-200'onClick={(): void => setPage((prev): number => prev +1)}>
      {`>`}
      </button>
    </div>
    {isLoading && (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    )}
    <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:
grid-cols-5 xl:grid-cols-6">
    {movies.map((movie) => (
      <MovieCard key = {movie.id} movie={movie} />
    ))}
    </div>
    </>
  )
};

export default MoviesPage;