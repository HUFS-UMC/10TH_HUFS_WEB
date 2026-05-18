interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-30
        flex h-14 w-14 items-center justify-center
        rounded-full bg-pink-500 text-3xl text-white
        shadow-lg hover:bg-pink-600
      "
      aria-label="LP 작성"
    >
      +
    </button>
  );
};

export default FloatingButton;