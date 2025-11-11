import React, { use } from 'react';
import photo from '../../assets/noReview.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';

const NoProperty = () => {
    const {theme} = use(AuthContext)
    return (
        <div>
            <div className=''>
                <div className='space-y-4 flex flex-col justify-center items-center '>
                    <img src={photo} alt="" className='h-120' />
                    <p className='text-3xl font-bold text-center'>No Properties Found !</p>
                    <p className={`text-lg ${theme === 'dark' ? "text-gray-400" : 'text-[#131313cc]'} font-semibold text-center mt-1`}>
                        It looks like you haven’t added any properties yet. Add some properties to see them here!
                    </p>
                    <Link to={'/addproperty'}><button className=' btn px-10 py-3 bg-[#1563DF] rounded-xl text-white hover:scale-105 transition-transform'><IoMdArrowRoundBack></IoMdArrowRoundBack> Go to Add Property</button></Link>
                </div>

            </div>
        </div>
    );
};

export default NoProperty;