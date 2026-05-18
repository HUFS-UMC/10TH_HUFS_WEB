interface Props {
  isOpen: boolean;
  close: () => void;
}

const Sidebar = ({ isOpen, close }: Props) => {
  return (
    <>
      {/* 🔥 사이드바 */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="font-bold">Menu</h2>

          <button onClick={close}>
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          <a href="/">홈</a>
          <a href="/my">마이페이지</a>
        </nav>
      </div>

      {/* 🔥 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={close}
        />
      )}
    </>
  );
};

export default Sidebar;