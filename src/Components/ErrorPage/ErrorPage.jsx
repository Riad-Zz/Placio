import React, { use } from 'react';
import photo from '../../assets/404page.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
const ErrorPage = () => {
    const { theme } = use(AuthContext)
    return (
        <div className={`${theme==='dark' ? "bg-[#1E1E1E]" : ""}`}>
            <div className='max-w-10/12 mx-auto'>
                <div className='min-h-screen space-y-4 flex flex-col justify-center items-center '>
                    <img src={photo} alt="" className='max-h-100' />
                    <p className='text-5xl font-bold font-[Playfair_Display]'>OOPs!</p>
                    <p className={` text-2xl ${theme === 'dark' ? "" :'text-[#131313cc]'}  font-bold text-center`}>Seems like something went wrong</p>
                    <Link to={'/'}><button className=' btn px-10 py-3 bg-[#1563DF] rounded-xl text-white hover:scale-105 transition-transform'><IoMdArrowRoundBack></IoMdArrowRoundBack> Go Back</button></Link>
                </div>

            </div>
        </div>

    );
};

export default ErrorPage;