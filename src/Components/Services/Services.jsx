import React, { use } from 'react';
import home1 from '../../assets/home-1.png'
import home2 from '../../assets/home-2.png'
import home3 from '../../assets/home-3.png'
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';

const Services = () => {
    const { theme } = use(AuthContext)

    const buttonConfig =
        theme === "dark"
            ? "flex cursor-pointer text-[16px] font-semibold items-center gap-2 px-7 py-3 border border-[#1563DF] rounded-3xl transition-all hover:bg-transparent hover:border-white hover:text-white text-white bg-[#1563DF]"
            : "flex cursor-pointer text-[16px] font-semibold items-center gap-2 px-7 py-3 border border-[#1563DF] rounded-3xl transition-all hover:bg-transparent hover:text-black text-white bg-[#1563DF]";

    const cardStyle =
        theme === "dark"
            ? "flex flex-col border border-gray-700 rounded-xl bg-[#1E1E1E] p-6 shadow-md hover:shadow-[#1563DF]/40 transition-all duration-300 hover:-translate-y-1"
            : "flex flex-col border border-gray-200 rounded-xl bg-white p-6 shadow-sm hover:shadow-[#1563DF]/20 transition-all duration-300 hover:-translate-y-1";

    const textColor = theme === 'dark' ? "text-gray-400" : "text-[#5c6368]";
    const titleColor = theme === 'dark' ? "text-white" : "text-gray-900";

    return (
        <div className='mt-20'>
            <p className='text-center text-[#1563DF] font-bold tracking-wider'>OUR SERVICES</p>
            <p className='text-4xl font-semibold text-center my-2'>
                Empowering You to Buy, Sell, and <br /> Manage Properties Smarter
            </p>
            <div className='max-w-11/12 xl:max-w-10/12 gap-10 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10'>

                <div className={cardStyle}>
                    <div className='flex justify-center'>
                        <img src={home1} alt="" />
                    </div>
                    <p className={`my-3 text-center font-bold text-2xl ${titleColor}`}>Buy A New Home</p>
                    <p className={`text-center my-3 ${textColor}`}>Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.</p>
                    <div className='flex justify-center'>
                        <button className={`${buttonConfig}`}>Learn More</button>
                    </div>
                </div>

                <div className={cardStyle}>
                    <div className='flex justify-center'>
                        <img src={home2} alt="" />
                    </div>
                    <p className={`my-3 text-center font-bold text-2xl ${titleColor}`}>Sell a Home</p>
                    <p className={`text-center my-3 ${textColor}`}>Showcase your property with confidence. Reach potential buyers quickly and secure the best value through expert support and seamless selling tools.</p>
                    <div className='flex justify-center'>
                        <button className={`${buttonConfig}`}>Learn More</button>
                    </div>
                </div>

                <div className={cardStyle}>
                    <div className='flex justify-center'>
                        <img src={home3} alt="" />
                    </div>
                    <p className={`my-3 text-center font-bold text-2xl ${titleColor}`}>Rent a Home</p>
                    <p className={`text-center my-3 ${textColor}`}>Find the perfect place to rent without the hassle. Browse verified listings and enjoy a smooth, transparent renting experience from start to finish.</p>
                    <div className='flex justify-center'>
                        <button className={`${buttonConfig}`}>Learn More</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Services;
