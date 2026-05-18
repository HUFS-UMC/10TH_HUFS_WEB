import { Link } from "react-router-dom";
import type { Lp } from "../../types/lp.ts";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const createdDate = new Date(lp.createdAt).toLocaleDateString();

  return (
    <Link to={`/lp/${lp.id}`} className="block">
      <div className="group relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/60" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-black/80 p-3 text-white transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="line-clamp-2 text-sm font-bold">{lp.title}</h3>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-300">
            <span>{createdDate}</span>
            <span>♥ {lp.likes.length}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LpCard;