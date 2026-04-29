import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const ProtectedLayout =() => {
    const {accessToken} = useAuth();

    if(!accessToken) {
        return <Navigate to={'/login'} replace />;
        }

    return (
        <div className="h-dvh flex flex-col">
        <NavBar2 />
        <main className="flex-1 mt-10">
            <Outlet />
        </main>
        <Footer />
    </div>
    );
};

export default ProtectedLayout;