import React, { useState, use } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
;
// import { useLocation, useNavigate } from 'react-router';
import regModel from '../../assets/RegisterImage.png'
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import { data, Link, useLocation, useNavigate } from 'react-router';
import useAxios from '../../Hooks/Axios/useAxios';
import { toast } from 'react-toastify';


const Register = () => {
    const [eye, setEye] = useState(false);
    const [error,seterror] = useState("") ;
    const { theme, GoogleLogin, setUser, user, emailPasswordReg, updateUserProfile } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    // ------------------- Onclick EyeControl ----------------
    const handleEyeClick = (e) => {
        e.preventDefault();
        setEye(!eye);
    }

    //----------------------Google Register--------------------------
    const handleGoogleRegister = (e) => {
        e.preventDefault();
        GoogleLogin().then(result => {
            const currentUser = result.user;
            setUser(currentUser);

            const newUser = {
                name: currentUser.displayName,
                email: currentUser.email,
                image: currentUser.photoURL,
            }

            //-------------Save the user to Db---------------------
            axiosInstance.post('/users', newUser)
                .then(data => {
                    if (data.data.insertedId) {
                        //Will do something ! 
                    }
                })

            navigate(location.state || '/');
        })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })

    }

    //-------------------Email Password Register---------------------------
    const handleEmailPasswordRegister = (e) => {
        e.preventDefault();
        const name = e.target.names.value;
        const image = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(name,image,email,password) ;

        //--------------Password Validation-----------------------
        if (!/[A-Z]/.test(password)) {
            // toast.warning("Password must contain at least one uppercase letter (A-Z).");
            seterror('Password must contain at least one uppercase letter (A-Z).')
            return;
        }

        if (!/[a-z]/.test(password)) {
            // toast.warning("Password must contain at least one lowercase letter (a-z).");
            seterror('Password must contain at least one lowercase letter (a-z).')
            return;
        }

        if (password.length < 6) {
            // toast.warning("Password must be at least 6 characters long.");
            seterror('Password must be at least 6 characters long.')
            return;
        }

        const newUser = {
            name: name,
            image: image,
            email: email,
            password: password,
        }

        emailPasswordReg(email, password).then(result => {
            const currentUser = result.user;
            navigate(location.state || '/');
            toast.success(`Welcome Onboard ${name}`) ;

            //---------------USer Save to DB--------------------------
            axiosInstance.post('/users', newUser)
                .then(data => {
                    if (data.data.insertedId) {
                        //May DO Something
                    }
                })
                .catch(error => {
                    toast.warning(error.message);
                })

            //---------------Updating User Name and Photo-----------------
            updateUserProfile({ displayName: name, photoURL: image })
                .then(() => {
                    setUser({ ...currentUser, displayName: name, photoURL: image })
                })
                .catch(error => {
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                })
        })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            })
    }


    return (
        <div className='min-h-[90vh] flex flex-col md:flex-row items-center justify-center p-1 md:px-14 py-10 bg-gray-100 dark:bg-[#1E1E1E] transition-colors duration-500'>

            {/*------------------------- Form Section--------------------------*/}
            <div className='w-full md:w-1/2 flex justify-center items-center'>
                <form onSubmit={handleEmailPasswordRegister}

                    className={`${theme === "dark" ? "bg-[#2A2A2A] text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"} 
                lg:py-20 rounded-xl shadow-lg border w-full max-w-md lg:max-w-2xl p-8 md:p-12 transition-colors duration-500`}
                >
                    {/*--------------------- -------------Title---------------------------------------------*/}
                    <p className='text-center font-bold text-3xl md:text-4xl mb-8 playfair-display-font'>
                        Create Your Account
                    </p>

                    {/*--------------------Name------------------------------*/}
                    <label className={`label font-bold text-[16px] mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Name</label>
                    <input
                        type="text"
                        className={`${theme === "dark" ? "bg-[#3A3A3A] text-white placeholder-gray-400 border-gray-600" : "bg-[#F3F3F3] text-black border-gray-300"} mb-3 w-full py-4 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1563DF] transition-all`}
                        placeholder="Enter Your Name"
                        name='names'
                        required
                    />

                    {/*------------------Photo URL------------------------------*/}
                    <label className={`label font-bold text-[16px] mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Photo URL</label>
                    <input
                        type="text"
                        className={`${theme === "dark" ? "bg-[#3A3A3A] text-white placeholder-gray-400 border-gray-600" : "bg-[#F3F3F3] text-black border-gray-300"} mb-3 w-full py-4 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1563DF] transition-all`}
                        placeholder="Photo link"
                        name='photo'
                        required
                    />

                    {/*-------------------------------------------Email------------------------*/}
                    <label className={`label font-bold text-[16px] mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email</label>
                    <input
                        type="email"
                        className={`${theme === "dark" ? "bg-[#3A3A3A] text-white placeholder-gray-400 border-gray-600" : "bg-[#F3F3F3] text-black border-gray-300"} mb-3 w-full py-4 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1563DF] transition-all`}
                        placeholder="Email"
                        name='email'
                        required
                    />

                    {/*-------------------Password--------------------------------*/}
                    <label className={`label font-bold text-[16px] mb-2 mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Password</label>
                    <div className='relative'>
                        <input
                            type={`${eye ? "text" : "password"}`}
                            className={`${theme === "dark" ? "bg-[#3A3A3A] text-white placeholder-gray-400 border-gray-600" : "bg-[#F3F3F3] text-black border-gray-300"} mb-3 w-full pr-10 py-4 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1563DF] transition-all`}
                            placeholder="Password"
                            name='password'
                            required
                        />
                        <p className='text-red-600 font-bold text-xs'>{error}</p>
                        {eye ? (
                            <FaEyeSlash onClick={handleEyeClick} className='z-10 absolute right-4 bottom-11 text-xl text-gray-400 cursor-pointer' />
                        ) : (
                            <FaEye onClick={handleEyeClick} className='z-10 absolute right-4 bottom-11 text-xl text-gray-400 cursor-pointer' />
                        )}
                    </div>

                    {/*------------------------Register Button--------------------------------*/}
                    <button
                        type="submit"
                        className={`btn mt-7 mb-3 w-full py-3 rounded-lg font-bold border-none transition
                    ${theme === "dark" ? "bg-[#1563DF] hover:bg-[#0f4bbd] text-white" : "bg-[#1563DF] hover:bg-[#0f4bbd] text-white"}`}
                    >
                        Register
                    </button>

                    {/* OR Divider */}
                    <p className='text-center font-semibold text-gray-500 dark:text-gray-400 mb-4'>OR</p>

                    {/*------------------------Google Login / Register------------------------------*/}
                    <button onClick={handleGoogleRegister}
                        className={`btn w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold border transition
                    ${theme === "dark" ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : "bg-gray-100 text-black border-gray-200 hover:bg-gray-200"}`}
                    >
                        <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </svg>
                        Continue with Google
                    </button>

                    {/*-----------------------Login Link------------------------------------*/}
                    <p className='text-center mt-6 text-gray-500 dark:text-gray-400'>
                        Already have an account?{' '}
                        <Link to={'/login'} className='font-bold text-[#1563DF] hover:text-[#0f4bbd]'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>

            {/*------------------------------Image Section---------------------------------*/}
            <div className='hidden md:flex md:w-1/2 justify-center items-center'>
                <img
                    src={regModel}
                    alt="Register Illustration"
                    className='max-w-xl w-full object-contain'
                />
            </div>

        </div>

    );
};

export default Register;
