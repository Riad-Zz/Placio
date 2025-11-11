import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import loginImage from '../../assets/loginImage.png'
import useAxios from '../../Hooks/Axios/useAxios';
import { toast } from 'react-toastify';



const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();
    const { theme, user, setUser, GoogleLogin, loginWithEmail } = use(AuthContext)
    const [eye, setEye] = useState(false);
    const [forget, setforget] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");


    // ------------------- Onclick EyeControl ----------------
    const handleEyeClick = (e) => {
        e.preventDefault();
        setEye(!eye);
    }
    //-------------Handle Forget Password toggler---------------------
    const handleForgetPassword = (e) => {
        e.preventDefault();
        setforget(!forget);
    }

    //----------------------Google Login Method-----------------------
    const handleGoogleLogin = (e) => {
        e.preventDefault();
        GoogleLogin().then((result) => {
            const currentUser = result.user;
            setUser(currentUser)
            const newUser = {
                name: currentUser.displayName,
                email: currentUser.email,
                image: currentUser.photoURL,
            }
            //---------------------Post Using Axios--------------------------------
            axiosInstance.post('/users', newUser)
                .then(data => {
                    if (data.data.insertedId) {
                        //Will DO Something
                    }
                })
            navigate(location.state || '/');
        })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }

    //-----------------Email Password Login Method-----------------------------
    const handleEmailLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        loginWithEmail(email, password).then((result) => {
            const currentUser = result.user;
            setUser(currentUser);
            toast.success(`Welcome ${currentUser.displayName}`, { theme: 'colored' })
            navigate(location.state || '/');
        })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(errorMessage , {theme:'colored'}) ;
            })
    }

    return (
        <div className={`min-h-[90vh] ${theme === "dark" ? "" : "bg-gray-100"} flex flex-col md:flex-row items-center justify-center px-2 md:px-5 py-10`}>

            {/* Form Section */}

            {
                forget ?
                    <div className='w-full md:w-1/2 flex justify-center items-center'>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault()
                                // Handle password reset logic here
                            }}
                            className={`${theme === "dark" ? "bg-[#2A2A2A] text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"} 
      py-12 rounded-xl shadow-lg border w-full max-w-md p-8 transition-colors duration-500`}
                        >
                            {/*-----------------------------Header------------------------------------*/}
                            <h2 className={`text-3xl font-semibold text-center mb-6 ${theme === "dark" ? "text-white" : "text-[#1563DF]"}`}>
                                Forgot Password
                            </h2>

                            {/*--------------------Description-------------------------------*/}
                            <p className={`text-center mb-5 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                Enter your email to receive a password reset link.
                            </p>

                            {/*----------------------------------Email------------------------------------*/}
                            <label className={`block font-bold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email"
                                defaultValue={currentEmail}
                                onChange={(e) => setCurrentEmail(e.target.value)}
                                className={`${theme === "dark" ? "bg-[#3A3A3A] text-white placeholder-gray-400 border-gray-600" : "bg-[#F3F3F3] text-black border-gray-300"} 
        w-full py-3 px-4 rounded-lg mb-5 border focus:outline-none focus:ring-2 focus:ring-[#1563DF] transition-all`}
                            />

                            {/*------------------------- Button----------------------------*/}
                            <button
                                type="submit"
                                className={`w-full py-3 rounded-lg font-bold transition 
        ${theme === "dark" ? "bg-[#1563DF] hover:bg-[#0f4bbd] text-white" : "bg-[#1563DF] hover:bg-[#0f4bbd] text-white"}`}
                            >
                                Send Reset Link
                            </button>

                            {/*-----------------------Back to Login-------------------*/}
                            <p
                                onClick={handleForgetPassword}
                                className={`mt-5 text-center font-bold cursor-pointer transition 
        ${theme === "dark" ? "text-gray-300 hover:text-[#1563DF]" : "text-gray-600 hover:text-[#0f4bbd]"}`}
                            >
                                Back to Login
                            </p>
                        </form>
                    </div>


                    :


                    <div className='w-full md:w-1/2 flex justify-center items-center'>
                        <form onSubmit={handleEmailLogin}
                            className={`${theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-white text-gray-900"} 
      lg:py-20 rounded-xl shadow-lg border ${theme === "dark" ? "border-gray-700" : "border-gray-200"} w-full max-w-md lg:max-w-2xl p-8 md:p-12 transition-colors duration-500`}
                        >
                            {/*---------------------Title--------------------------------- */}
                            <p className='text-center font-bold text-3xl md:text-4xl mb-8 playfair-display-font'>
                                Welcome Back
                            </p>

                            {/*-------------------------Email------------------------------------ */}
                            <label className={`label font-bold text-[16px] mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                className={`${theme === "dark" ? "bg-[#3A3A3A] text-white placeholder-gray-400" : "bg-[#F3F3F3] text-black"} 
        mb-3 w-full py-4 px-4 rounded-lg border ${theme === "dark" ? "border-gray-600" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#1563DF] transition-all`}
                                placeholder="Email"
                                name='email'
                                onChange={(e) => setCurrentEmail(e.target.value)}
                                value={currentEmail}
                            />

                            {/*--------------------------Password------------------------------*/}
                            <label className={`label font-bold text-[16px] mb-2 mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    type={`${eye ? "text" : "password"}`}
                                    className={`${theme === "dark" ? "bg-[#3A3A3A] text-white placeholder-gray-400" : "bg-[#F3F3F3] text-black"} 
          mb-3 w-full pr-10 py-4 px-4 rounded-lg border ${theme === "dark" ? "border-gray-600" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#1563DF] transition-all`}
                                    placeholder="Password"
                                    name='password'
                                />
                                {eye ? (
                                    <FaEyeSlash onClick={handleEyeClick} className='z-10 absolute right-4 bottom-7 text-xl text-gray-400 cursor-pointer' />
                                ) : (
                                    <FaEye onClick={handleEyeClick} className='z-10 absolute right-4 bottom-7 text-xl text-gray-400 cursor-pointer' />
                                )}
                            </div>

                            {/*------------------------Forget Password----------------------------*/}
                            <div className='mt-3 flex flex-col md:flex-row gap-3 justify-between'>
                                <div className='flex items-center gap-2'>
                                    <input type="checkbox" className="checkbox" />
                                    <p className='font-bold'>Remember me</p>
                                </div>
                                <p onClick={handleForgetPassword} className='text-gray-500 dark:text-gray-300 font-bold cursor-pointer hover:text-[#1563DF]'>
                                    Forget Password
                                </p>
                            </div>

                            {/*-----------------------Login Button------------------------*/}
                            <button
                                type="submit"
                                className={`btn mt-7 mb-3 w-full py-3 rounded-lg font-bold border-none transition
        ${theme === "dark" ? "bg-[#1563DF] hover:bg-[#0f4bbd] text-white" : "bg-[#1563DF] hover:bg-[#0f4bbd] text-white"}`}
                            >
                                Login
                            </button>

                            {/* OR Divider */}
                            <p className='text-center font-semibold text-gray-500 dark:text-gray-400 mb-4'>OR</p>

                            {/* Google Login */}
                            <button onClick={handleGoogleLogin}
                                className={`btn w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold border transition 
        ${theme === "dark" ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : "bg-gray-100 text-black border-gray-200 hover:bg-gray-200"}`}
                            >
                                <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                </svg>
                                Login with Google
                            </button>

                            {/* Register Link */}
                            <p className='text-center mt-6 text-gray-500 dark:text-gray-400'>
                                Don’t have an account?{' '}
                                <Link to={'/register'} className='font-bold text-[#1563DF] hover:text-[#0f4bbd]'>
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>


            }


            {/* Image Section */}
            <div className='hidden md:flex md:w-1/2 justify-center items-center'>
                <img
                    src={loginImage}
                    alt="Login Illustration"
                    className='max-w-xl w-full object-contain'
                />

            </div>



        </div>
    );
};

export default Login;