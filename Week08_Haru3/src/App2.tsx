import { HamburgerButton } from "./components/HamburgerButton";
import { Sidebar } from "./components/Sidebar";
import { useSidebar } from "./hooks/useSidebrar";

function App2() {
    const {isOpen, toggle, close}= useSidebar();

    return (
        <div className="min-h screen bg-gray-50 dark:bg-gray-950 w-full">
            <header className="fixed top-- left-0 bg-white shadow-sm z-50 w-full">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16 gap-4">
                        <HamburgerButton isOpen={isOpen} onClick={toggle} />
                        <h1 className="text-xl font-bold text-gray-900">Lp사이트</h1>
                    </div>
                    </div>            
                </header>
                <Sidebar isOpen={isOpen} onClose={close} />
        </div>
    );
}

export default App2;