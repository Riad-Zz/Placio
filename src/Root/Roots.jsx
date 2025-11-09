import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const Roots = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Apply theme on html root
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className={`${theme === "dark" ? "bg-[#1E1E1E] text-gray-100" : "bg-white text-black"} min-h-screen`}>
            {/* Pass theme state and setter to Navbar */}
            <Navbar theme={theme} setTheme={setTheme} />
                <Outlet />
            
        </div>
    );
};

export default Roots;
