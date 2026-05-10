import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
    >
      {/* 이미지 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        
        <h3 className="text-white text-sm font-semibold">
          {lp.title}
        </h3>

        <p className="text-gray-200 text-xs mt-1">
          ❤️ {lp.likes.length}
        </p>

        <p className="text-gray-300 text-xs">
          {new Date(lp.createAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default LpCard;