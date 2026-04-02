import type { MovieDetailResponse } from '../types/MovieDetail';

interface ProductionInfoProps {
  movie: MovieDetailResponse;
}

const ProductionInfo = ({ movie }: ProductionInfoProps) => {
  return (
    <div className='max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div>
        <h3 className='text-xl font-bold mb-3'>제작사</h3>
        <div className='space-y-2'>
          {movie.production_companies.map(company => (
            <p key={company.id} className='text-gray-300'>{company.name}</p>
          ))}
        </div>
      </div>
      <div>
        <h3 className='text-xl font-bold mb-3'>개봉국</h3>
        <div className='space-y-2'>
          {movie.production_countries.map((country, idx) => (
            <p key={idx} className='text-gray-300'>{country.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductionInfo;
