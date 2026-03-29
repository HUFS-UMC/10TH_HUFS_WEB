import type { Cast, CreditsResponse } from '../types/MovieDetail';

interface CastListProps {
  cast: Cast[];
  credits: CreditsResponse | null;
}

const CastList = ({ cast, credits }: CastListProps) => {
  const director = credits?.crew.find(person => person.job === 'Director');

  return (
    <div className='max-w-full mx-auto mt-16'>
      <h2 className='text-3xl font-bold mb-8 px-6'>감독/출연</h2>
      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-6 px-6'>
        {/* 감독 */}
        {director && (
          <div key={director.id} className='text-center'>
            <div className='mb-3'>
              {director.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                  alt={director.name}
                  className='w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-700'
                />
              ) : (
                <div className='w-32 h-32 rounded-full mx-auto bg-gray-700 flex items-center justify-center border-4 border-gray-700'>
                  <span className='text-gray-400'>이미지 없음</span>
                </div>
              )}
            </div>
            <p className='font-semibold text-sm'>{director.name}</p>
            <p className='text-gray-400 text-xs'>감독</p>
          </div>
        )}

        {/* 출연진 */}
        {cast.map(actor => (
          <div key={actor.id} className='text-center'>
            <div className='mb-3'>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className='w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-700'
                />
              ) : (
                <div className='w-32 h-32 rounded-full mx-auto bg-gray-700 flex items-center justify-center border-4 border-gray-700'>
                  <span className='text-gray-400'>이미지 없음</span>
                </div>
              )}
            </div>
            <p className='font-semibold text-sm'>{actor.name}</p>
            <p className='text-gray-400 text-xs'>{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
