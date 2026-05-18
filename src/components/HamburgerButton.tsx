interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "사이드바 닫기" : "사이드바 열기"}
      className="rounded-md p-2 transition-colors duration-200 hover:bg-gray-800"
    >
      <div className="flex h-5 w-6 flex-col justify-between">
        <span
          className={`block h-0.5 w-full rounded bg-white transition-all duration-300 ease-in-out ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />

        <span
          className={`block h-0.5 w-full rounded bg-white transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />

        <span
          className={`block h-0.5 w-full rounded bg-white transition-all duration-300 ease-in-out ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </div>
    </button>
  );
};

export default HamburgerButton;