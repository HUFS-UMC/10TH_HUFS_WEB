import { Outlet } from "react-router-dom";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const HomeLayout =() => {
    return (
    <div className="h-dvh flex flex-col">
        <NavBar2 />
        <main className="flex-1 mt-10">
            <Outlet />
        </main>
        <Footer />
    </div>
    )
};

export default HomeLayout;