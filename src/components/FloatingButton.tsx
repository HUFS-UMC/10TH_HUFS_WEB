import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/lp/create");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        fixed bottom-6 right-6 z-30
        w-14 h-14 rounded-full
        bg-pink-500 text-white text-3xl
        shadow-lg hover:bg-pink-600
        flex items-center justify-center
      "
      aria-label="LP 작성"
    >
      +
    </button>
  );
};

export default FloatingButton;