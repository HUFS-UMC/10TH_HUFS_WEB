import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <main className="pt-16"> 
        <Outlet />
      </main>

    </div>
  );
};

export default RootLayout;