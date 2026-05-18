import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100dvh-4rem)] w-56 border-r border-gray-800 bg-[#111827] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col justify-between px-5 py-6">
          <div className="flex flex-col gap-6 text-sm text-gray-200">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-2 transition-colors duration-200 hover:text-pink-400"
            >
              <span>🔍</span>
              <span>찾기</span>
            </Link>

            <Link
              to="/my"
              onClick={onClose}
              className="flex items-center gap-2 transition-colors duration-200 hover:text-pink-400"
            >
              <span>👤</span>
              <span>마이페이지</span>
            </Link>

            <Link
              to="/throttle"
              onClick={onClose}
              className="flex items-center gap-2 transition-colors duration-200 hover:text-pink-400"
            >
              <span>⚡</span>
              <span>Throttle</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-left text-sm text-gray-300 transition-colors duration-200 hover:text-pink-400"
          >
            탈퇴하기
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;