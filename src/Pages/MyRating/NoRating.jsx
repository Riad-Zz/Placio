import React from 'react';

import photo from '../../assets/noReview.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router';

const NoRating = () => {
    return (
        <div>
            <div className=''>
                <div className='space-y-4 flex flex-col justify-center items-center '>
                    <img src={photo} alt="" className='h-120' />
                    <p className='text-5xl font-bold'>No Review Found!</p>
                    <p className=' text-2xl text-[#131313cc] font-bold text-center'>Please Review Some Property first to see you Reviews</p>
                    <Link to={'/allproperty'}><button className=' btn px-10 py-3 bg-[#1563DF] rounded-xl text-white hover:scale-105 transition-transform'><IoMdArrowRoundBack></IoMdArrowRoundBack> Go to All Property</button></Link>
                </div>

            </div>
        </div>
    );
};

export default NoRating;