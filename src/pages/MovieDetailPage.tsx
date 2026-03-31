import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
  const { movieId } = useParams();

  return <div className="p-10 text-white">MovieDetailPage {movieId}</div>;
}