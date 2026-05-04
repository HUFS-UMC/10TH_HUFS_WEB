import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <aside
      className={`
        fixed top-16 left-0 z-20 h-[calc(100dvh-4rem)] w-52
        bg-[#111827] border-r border-gray-800
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <nav className="flex h-full flex-col justify-between px-5 py-6">
        <div className="flex flex-col gap-6 text-sm text-gray-200">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 hover:text-pink-400"
          >
            🔍 <span>찾기</span>
          </Link>

          <Link
            to="/my"
            onClick={onClose}
            className="flex items-center gap-2 hover:text-pink-400"
          >
            👤 <span>마이페이지</span>
          </Link>
        </div>

        <button
          type="button"
          className="text-left text-sm text-gray-300 hover:text-pink-400"
        >
          탈퇴하기
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;