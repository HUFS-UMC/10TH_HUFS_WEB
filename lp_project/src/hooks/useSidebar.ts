import {useEffect, useState} from "react";

export function useSidebar(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const openSidebar = ()=>{
        setIsSidebarOpen(true);
    };
    const closeSidebar=()=>{
        setIsSidebarOpen(false);
    }
    const toggleSidebar=()=>{
        setIsSidebarOpen((prev)=> !prev);
    }

    useEffect(()=>{
        if(!isSidebarOpen) return;
        const handleKeyDown = (event: KeyboardEvent)=>{
            if(event.key === "Escape"){
                closeSidebar();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return ()=>{
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isSidebarOpen]);

      useEffect(() => {
    if (!isSidebarOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isSidebarOpen]);

  return {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  }
}