import { useState } from "react";
import { Link } from "react-router-dom";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">

      {/* 🔥 메뉴 목록 */}
      {isOpen && (
        <>
          <Link
            to="/"
            className="bg-white px-4 py-2 rounded shadow hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            홈
          </Link>

          <Link
            to="/my"
            className="bg-white px-4 py-2 rounded shadow hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            마이페이지
          </Link>
        </>
      )}

      {/* 🔥 + 버튼 */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="
          w-14 h-14 
          bg-blue-500 text-white text-2xl 
          rounded-full shadow-lg
          flex items-center justify-center
          hover:bg-blue-600
          transition
        "
      >
        {isOpen ? "✕" : "+"}
      </button>
    </div>
  );
};

export default FloatingMenu;