import React, { use } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import Footer from '../Components/Footer/Footer';

const Roots = () => {
    const {theme,setTheme} = use(AuthContext)

    return (
        <div className={`${theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white text-black"} min-h-screen`}>
            {/* Pass theme state and setter to Navbar */}
            <Navbar theme={theme} setTheme={setTheme} />
                <Outlet />
            <Footer></Footer>
        <ToastContainer></ToastContainer>

        </div>
    );
};

export default Roots;
