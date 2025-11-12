import React, { use } from 'react';
import { CiPhone } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import agent1 from '../../assets/agent-5.jpg'
import agent2 from '../../assets/agent-6.jpg'
import agent3 from '../../assets/agent-7.jpg'
import agent4 from '../../assets/agent-8.jpg'
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';

const Agent = () => {
    const {theme} = use(AuthContext)
    return (
        <div className='md:max-w-9/12  max-w-11/12 px-1  mx-auto my-20'>
            <p className='text-center  text-[#1563DF] font-bold tracking-wider'>OUR TEAM</p>
            <p className='text-4xl font-semibold text-center my-2'>
                Meet Our Agents
            </p>
            <div className='grid grid-cols-1 mt-5 gap-7 md:grid-cols-2 xl:grid-cols-4'>
                <div className=''>
                    <img src={agent1} alt="" className='rounded-xl transform transition-transform duration-500 hover:scale-102' />
                    <div className='flex  justify-between items-center'>
                        <div className='mt-2'>
                            <p className='text-2xl font-semibold'>Chris Patt</p>
                            <p className={`${theme === 'dark' ? "text-gray-400" : "text-[#5c6368]"} `}>Administrative Stuff</p>
                        </div>
                        <div className='flex px-4 gap-3'>
                            <div className='hover:bg-[#1563DF] hover:text-white border border-gray-500 rounded-full p-2 cursor-pointer'>
                            <CiPhone></CiPhone>
                            </div>
                            <div className='hover:bg-[#1563DF] border-gray-500 hover:text-white border rounded-full p-2 cursor-pointer'>
                            <MdOutlineEmail></MdOutlineEmail>
                            </div>
                        </div>
                    </div>

                </div>
                <div className=''>
                    <img src={agent2} alt="" className=' rounded-xl transform transition-transform duration-500 hover:scale-102' />
                    <div className='flex  justify-between items-center'>
                        <div className='mt-2'>
                            <p className='text-2xl font-semibold'>Ethan Williams</p>
                            <p className={`${theme === 'dark' ? "text-gray-400" : "text-[#5c6368]"} `}>Senior Property Consultant</p>
                        </div>
                        <div className='flex px-4 gap-3'>
                            <div className='hover:bg-[#1563DF] border-gray-500 hover:text-white border rounded-full p-2 cursor-pointer'>
                            <CiPhone></CiPhone>
                            </div>
                            <div className='hover:bg-[#1563DF] border-gray-500 hover:text-white border rounded-full p-2 cursor-pointer'>
                            <MdOutlineEmail></MdOutlineEmail>
                            </div>
                        </div>
                    </div>

                </div>

                <div className=''>
                    <img src={agent3} alt="" className=' rounded-xl transform transition-transform duration-500 hover:scale-102' />
                    <div className='flex  justify-between items-center'>
                        <div className='mt-2'>
                            <p className='text-2xl font-semibold'>Michael Carter</p>
                            <p className={`${theme === 'dark' ? "text-gray-400" : "text-[#5c6368]"} `}>Real Estate Investment Advisor</p>
                        </div>
                        <div className='flex px-4 gap-3'>
                            <div className='hover:bg-[#1563DF] border-gray-500 hover:text-white border rounded-full p-2 cursor-pointer'>
                            <CiPhone></CiPhone>
                            </div>
                            <div className='hover:bg-[#1563DF] border-gray-500 hover:text-white border rounded-full p-2 cursor-pointer'>
                            <MdOutlineEmail></MdOutlineEmail>
                            </div>
                        </div>
                    </div>

                </div>

                <div className=''>
                    <img src={agent4} alt="" className=' rounded-xl transform transition-transform duration-500 hover:scale-102' />
                    <div className='flex  justify-between items-center'>
                        <div className='mt-2'>
                            <p className='text-2xl font-semibold'>Sofia Ramirez</p>
                            <p className={`${theme === 'dark' ? "text-gray-400" : "text-[#5c6368]"} `}>Marketing & Client Relations Manager</p>
                        </div>
                        <div className='flex px-4 gap-3'>
                            <div className='hover:bg-[#1563DF] border-gray-500 hover:text-white border rounded-full p-2 cursor-pointer'>
                            <CiPhone></CiPhone>
                            </div>
                            <div className='hover:bg-[#1563DF] border-gray-500 hover:text-white border rounded-full p-2 cursor-pointer'>
                            <MdOutlineEmail></MdOutlineEmail>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Agent;