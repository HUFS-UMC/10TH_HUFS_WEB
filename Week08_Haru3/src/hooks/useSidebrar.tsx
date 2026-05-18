import { useState } from "react"

export const useSidebar =() => {
    const [isOpen, setIsOpen] = useState(false);

    //setIsOpen-> true => open, flase=> close

    const toggle =() => {
        setIsOpen((prev)=>!prev);
    };

    const open =() => {
        setIsOpen(true);
    };

    const close=() => {
        setIsOpen(false);
    };

    return {
        isOpen,
        toggle,
        open,
        close,
    };
};