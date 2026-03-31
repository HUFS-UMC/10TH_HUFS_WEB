import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="p-4">
              <Outlet />
            </div>
        </>
    );
};

export default HomePage;