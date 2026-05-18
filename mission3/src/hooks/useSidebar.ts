import { useEffect, useState } from "react";

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 열기
  const open = () => {
    setIsOpen(true);
  };

  // 닫기
  const close = () => {
    setIsOpen(false);
  };

  // 토글
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useSidebar;