import { Outlet } from "react-router-dom";
import { Navdar } from "../components/Navdar";

const HomePage = () => {
    return (
        <>
        <Navdar />
        <Outlet />
        
        </>
    );
}

export default HomePage;