import { Link } from "react-router-dom";
import type { Lp } from "../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <Link to={`/lp/${lp.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-zinc-800 rounded-md">
        {lp.thumbnail ? (
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h3 className="text-white font-bold line-clamp-2">{lp.title}</h3>

          <p className="text-gray-300 text-sm mt-1">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>

          <p className="text-pink-400 text-sm mt-1">
            좋아요 {lp.likes.length}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LpCard;