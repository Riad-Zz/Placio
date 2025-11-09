import React, { useState, useEffect } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Apply theme to HTML
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled
                ? "shadow-lg backdrop-blur-md bg-white/80 dark:bg-gray-800/80"
                : "bg-transparent"
                }`}
        >
            <div className="xl:max-w-10/12 mx-auto px-1 md:px-6 py-4 flex justify-between items-center">
                {/* Left: Hamburger + Logo */}
                <div className="flex items-center gap-3">
                    {/* Hamburger menu */}
                    <div className="lg:hidden dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-square p-2 py-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white dark:text-gray-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-56 space-y-2"
                        >
                            <a href="#home" className="py-2 px-3 rounded hover:bg-primary hover:text-white">
                                Home
                            </a>
                            <a
                                href="#all-properties"
                                className="py-2 px-3 rounded hover:bg-primary hover:text-white"
                            >
                                All Properties
                            </a>
                            <a
                                href="#add-properties"
                                className="py-2 px-3 rounded hover:bg-primary hover:text-white"
                            >
                                Add Properties
                            </a>
                            <a
                                href="#my-properties"
                                className="py-2 px-3 rounded hover:bg-primary hover:text-white"
                            >
                                My Properties
                            </a>
                            <a
                                href="#my-ratings"
                                className="py-2 px-3 rounded hover:bg-primary hover:text-white"
                            >
                                My Ratings
                            </a>
                        </ul>
                    </div>

                    {/* Logo */}
                    <a href="/" className="flex items-center">
                        <img
                            src="./logo-white.png"
                            alt="Logo"
                            className="h-12 w-auto transition-all duration-500"
                        />
                    </a>

                </div>

                {/* Middle: Nav links for large screens */}
                <nav
                    className={`hidden lg:flex gap-8 font-medium transition-colors duration-500 ${scrolled ? "text-gray-800 dark:text-white" : "text-white"
                        }`}
                >
                    <a href="#home" className="hover:text-primary transition-colors">
                        Home
                    </a>
                    <a href="#all-properties" className="hover:text-primary transition-colors">
                        All Properties
                    </a>
                    <a href="#add-properties" className="hover:text-primary transition-colors">
                        Add Properties
                    </a>
                    <a href="#my-properties" className="hover:text-primary transition-colors">
                        My Properties
                    </a>
                    <a href="#my-ratings" className="hover:text-primary transition-colors">
                        My Ratings
                    </a>
                </nav>

                {/* Right: Theme toggle + Sign In */}
                <div className="flex items-center gap-3">
                    {/* Theme toggle */}
                    <input
                        type="checkbox"
                        className="toggle toggle-sm"
                        defaultChecked={theme === "dark"}
                        onChange={(e) => handleTheme(e.target.checked)}
                    />

                    {/* Sign In */}
                    <a
                        href="#login"
                        className={`px-4 py-2 border rounded transition-colors ${scrolled
                            ? "text-gray-800 border-gray-800 dark:text-white dark:border-white"
                            : "text-white border-white"
                            } hover:border-primary hover:text-primary`}
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
