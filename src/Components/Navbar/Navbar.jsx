import React, { } from "react";
import { Link, NavLink } from "react-router";

const Navbar = ({ theme, setTheme }) => {

    //-----------------Navbar Style----------------------------------
    const navbarClasses =
        theme === "dark"
            ? "bg-[#1E1E1E] text-white"
            : "bg-white text-gray-900";

    //------------------------Buttons---------------------------------
    const loginButtonClasses =
        theme === "dark"
            ? "flex text-[16px] font-semibold items-center gap-2 px-5 py-3 border border-white rounded-3xl transition-all hover:bg-white hover:text-[#1563DF] text-white"
            : "flex text-[16px] font-semibold items-center gap-2 px-5 py-3 border border-[#1563DF] rounded-3xl transition-all hover:bg-[#1563DF] hover:text-white text-gray-900";

    const registerButtonClasses =
        theme === "dark"
            ? "flex text-[16px] font-semibold items-center gap-2 px-5 py-3 border border-white rounded-3xl transition-all hover:bg-white hover:text-[#1563DF] text-[#1563DF] bg-white"
            : "flex text-[16px] font-semibold items-center gap-2 px-5 py-3 border border-[#1563DF] rounded-3xl transition-all hover:bg-[#1563DF] hover:text-white text-white bg-[#1563DF]";

    //----------------------------NavLinks-----------------------------
    const links = (
        <>
            <NavLink to={"/"} className="">
                Home
            </NavLink>
            <NavLink to={"/allproperty"} className="">
                All Properties
            </NavLink>
            <NavLink to={"/addproperty"} className="">
                Add Properties
            </NavLink>
            <NavLink to={"/myproperty"} className="">
                My Properties
            </NavLink>
            <NavLink to={"/myrating"} className="">
                My Ratings
            </NavLink>
        </>
    );

    return (
        <header className={`w-full transition-all duration-500 ${navbarClasses}`}>
            <div className="xl:max-w-10/12 lg:max-w-11/12 mx-auto px-1  py-4 flex justify-between items-center">
                {/* Left: Hamburger + Logo */}
                <div className="flex items-center gap-3">
                    {/* Hamburger menu */}
                    <div className="xl:hidden dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-square p-2 py-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
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
                            className="menu menu-compact dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-56 space-y-2 hamburger"
                        >
                            <NavLink to={"/"} className="py-2 px-3 rounded hover:bg-primary hover:text-white">
                                Home
                            </NavLink>
                            <NavLink to={"/allproperty"} className="py-2 px-3 rounded hover:bg-primary hover:text-white">
                                All Properties
                            </NavLink>
                            <NavLink to={"/addproperty"} className="py-2 px-3 rounded hover:bg-primary hover:text-white">
                                Add Properties
                            </NavLink>
                            <NavLink to={"/myproperty"} className="py-2 px-3 rounded hover:bg-primary hover:text-white">
                                My Properties
                            </NavLink>
                            <NavLink to={"/myrating"} className="py-2 px-3 rounded hover:bg-primary hover:text-white">
                                My Ratings
                            </NavLink>
                        </ul>
                    </div>

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2">
                        <img src="./logo2.png" alt="Logo" className="h-12 w-auto transition-all duration-500" />
                        <span className={`text-3xl font-bold hidden sm:inline-block ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            PlaCio
                        </span>
                    </a>
                </div>

                {/*-------------------- Middle: Nav links for large screens----------------------------- */}
                <nav className={`hidden xl:flex gap-8 font-semibold text-lg transition-colors midnav duration-500 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {links}
                </nav>

                {/*------------------------ Right: Theme toggle + Login/Registe-------------------------------r */}
                <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={theme === "dark"}
                            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                        />

                        <div className="w-14 h-8 rounded-full bg-gray-300 peer-checked:bg-[#1563DF] transition-all duration-300 shadow-inner"></div>
                        <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 peer-checked:translate-x-6 flex items-center justify-center">
                            <span className="text-yellow-400 text-lg peer-checked:hidden">☀️</span>
                            <span className="text-gray-700 text-lg hidden peer-checked:inline">🌙</span>
                        </div>
                    </label>

                    <Link to={'/login'} className={`${loginButtonClasses}`}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                        >
                            <path
                                d="M13.1251 5C13.1251 5.8288 12.7959 6.62366 12.2099 7.20971C11.6238 7.79576 10.8289 8.125 10.0001 8.125C9.17134 8.125 8.37649 7.79576 7.79043 7.20971C7.20438 6.62366 6.87514 5.8288 6.87514 5C6.87514 4.1712 7.20438 3.37634 7.79043 2.79029C8.37649 2.20424 9.17134 1.875 10.0001 1.875C10.8289 1.875 11.6238 2.20424 12.2099 2.79029C12.7959 3.37634 13.1251 4.1712 13.1251 5ZM3.75098 16.765C3.77776 15.1253 4.44792 13.5618 5.61696 12.4117C6.78599 11.2616 8.36022 10.6171 10.0001 10.6171C11.6401 10.6171 13.2143 11.2616 14.3833 12.4117C15.5524 13.5618 16.2225 15.1253 16.2493 16.765C14.2888 17.664 12.1569 18.1279 10.0001 18.125C7.77014 18.125 5.65348 17.6383 3.75098 16.765Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Login
                    </Link>

                    <Link to={'/register'} className={`${registerButtonClasses} hidden md:flex`}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                        >
                            <path
                                d="M13.1251 5C13.1251 5.8288 12.7959 6.62366 12.2099 7.20971C11.6238 7.79576 10.8289 8.125 10.0001 8.125C9.17134 8.125 8.37649 7.79576 7.79043 7.20971C7.20438 6.62366 6.87514 5.8288 6.87514 5C6.87514 4.1712 7.20438 3.37634 7.79043 2.79029C8.37649 2.20424 9.17134 1.875 10.0001 1.875C10.8289 1.875 11.6238 2.20424 12.2099 2.79029C12.7959 3.37634 13.1251 4.1712 13.1251 5ZM3.75098 16.765C3.77776 15.1253 4.44792 13.5618 5.61696 12.4117C6.78599 11.2616 8.36022 10.6171 10.0001 10.6171C11.6401 10.6171 13.2143 11.2616 14.3833 12.4117C15.5524 13.5618 16.2225 15.1253 16.2493 16.765C14.2888 17.664 12.1569 18.1279 10.0001 18.125C7.77014 18.125 5.65348 17.6383 3.75098 16.765Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
