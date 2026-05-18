import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick: () => void;
  onWithdrawClick: () => void;
}

const Sidebar = ({
  isOpen,
  onClose,
  onSearchClick,
  onWithdrawClick,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen w-64
        bg-zinc-950 border-r border-zinc-800 p-5
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:h-[calc(100vh-64px)] md:translate-x-0
      `}
    >
      <div className="mt-16 flex flex-col gap-4 md:mt-0">
        <button
          type="button"
          onClick={() => {
            onSearchClick();
            onClose();
          }}
          className="text-left hover:text-pink-400"
        >
          🔍 찾기
        </button>

        <button
          type="button"
          onClick={() => {
            navigate("/mypage");
            onClose();
          }}
          className="text-left hover:text-pink-400"
        >
          👤 마이페이지
        </button>
      </div>

      {isAuthenticated && (
        <div className="mt-200 border-t border-neutral-700 pt-4">
          <button
            type="button"
            onClick={onWithdrawClick}
            className="w-full rounded-md border border-red-500 px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white"
          >
            탈퇴하기
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;