import React, { useContext } from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const Footer = () => {
    const { theme } = useContext(AuthContext);

    return (
        <footer
            className={`w-full border-t transition-all duration-300 ${theme === "dark"
                    ? "bg-[#1E1E1E] border-gray-700 text-gray-300"
                    : "bg-[#111111] border-gray-800 text-gray-300"
                }`}
        >
            <div className="max-w-11/12 items-center mx-auto  py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo Placeholder */}
                <div>
                    <div className="flex flex-col xl:flex-row md:items-center gap-2 justify-start">

                            <img src="/logo2.png" alt="" className="w-20 h-20" />
                            <p className={`text-sm mt-4 leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-400"
                            }`}
                    >
                        We provide instant property listing and management service across
                        the world — making property deals faster, smarter, and secure.
                    </p>
                    </div>
                        
                    
                    
                </div>

                {/* Instant Service / Contact */}
                <div>
                    <h2
                        className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-white"
                            }`}
                    >
                        Instant Service
                    </h2>
                    <ul
                        className={`space-y-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-400"
                            }`}
                    >
                        <li>Email: support@placio.com</li>
                        <li>Phone: +1 234 567 890</li>
                        <li>Address: 221B Baker Street, London, UK</li>
                    </ul>
                </div>

                {/* Company Section */}
                <div>
                    <h2
                        className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-white"
                            }`}
                    >
                        Company
                    </h2>
                    <ul
                        className={`space-y-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-400"
                            }`}
                    >
                        <li>
                            <Link
                                
                                className={`hover:underline ${theme === "dark"
                                        ? "hover:text-white"
                                        : "hover:text-gray-200"
                                    }`}
                            >
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link
                                
                                className={`hover:underline ${theme === "dark"
                                        ? "hover:text-white"
                                        : "hover:text-gray-200"
                                    }`}
                            >
                                Legal Information
                            </Link>
                        </li>
                        <li>
                            <Link
                                
                                className={`hover:underline ${theme === "dark"
                                        ? "hover:text-white"
                                        : "hover:text-gray-200"
                                    }`}
                            >
                                Contact Support
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Section */}
                <div>
                    <h2
                        className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-white"
                            }`}
                    >
                        Follow Us
                    </h2>
                    <div className="flex flex-wrap gap-4 text-lg">
                        {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map(
                            (Icon, i) => (
                                <a
                                    key={i}
                                    
                                    className={`p-2 cursor-pointer rounded-full border transition-all duration-200 ${theme === "dark"
                                            ? "border-gray-600 text-gray-400 hover:text-white hover:border-white"
                                            : "border-gray-700 text-gray-400 hover:text-white hover:border-white"
                                        }`}
                                >
                                    <Icon />
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div
                className={`border-t mt-6 ${theme === "dark" ? "border-gray-700" : "border-gray-800"
                    }`}
            >
                <div
                    className={`max-w-10/12 text  mx-auto  py-5  ${theme === "dark" ? "text-gray-400" : "text-gray-400"
                        }`}
                >
                    <p className="text-center">© {new Date().getFullYear()} Placio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
