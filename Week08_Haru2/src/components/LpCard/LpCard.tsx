import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp";

interface LpCardProps {
    lp: Lp;
}

function timeAgo(date: Date | string) {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}분 전`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}시간 전`;
    return `${Math.floor(hours / 24)}일 전`;
}

const LpCard = ({ lp }: LpCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/lp/${lp.id}`)}
            className="relative aspect-square overflow-hidden cursor-pointer bg-[#1a1a1a] rounded-sm group"
        >
            {/* 썸네일 */}
            <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.08]"
                loading="lazy"
            />

            {/* 호버 오버레이 */}
            <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {/* 제목 */}
                <p className="text-white text-xs font-bold leading-tight mb-1.5 line-clamp-2">
                    {lp.title}
                </p>
                {/* 업로드일 + 좋아요 */}
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white/55">
                        {timeAgo(lp.createAt)}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-pink-400">
                        <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
                        </svg>
                        {lp.likes?.length ?? 0}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LpCard;