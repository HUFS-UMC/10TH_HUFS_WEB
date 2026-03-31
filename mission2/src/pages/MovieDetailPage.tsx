import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    
    console.log(movieId);

    return (
        <div className="flex flex-col items-center justify-center p-10 gap-4">
            <h1 className="text-2xl font-bold text-purple-600">🎬 영화 상세 페이지</h1>
            <p className="text-lg bg-gray-100 p-4 rounded-lg shadow-inner">
                현재 선택된 영화 ID: <span className="font-mono font-bold text-blue-500">{movieId}</span>
            </p>
            <p className="text-gray-500 text-sm italic">
            </p>
        </div>
    );
};

export default MovieDetailPage;