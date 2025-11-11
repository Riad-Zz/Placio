import React, { useContext } from 'react';
import useAxios from '../../Hooks/Axios/useAxios';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

import { IoLocationOutline as IconLocation } from 'react-icons/io5';
import { FiEdit as IconEdit, FiTrash2 as IconTrash } from 'react-icons/fi';
import { BsArrowRight as IconArrowForward } from 'react-icons/bs';
import { LuBedDouble } from 'react-icons/lu';
import { LiaBathSolid } from 'react-icons/lia';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import NoProperty from './NoProperty';

const MyProperty = () => {
    const { user, theme } = useContext(AuthContext);
    const axiosInstance = useAxios();
    // const queryClient = useQueryClient();

    const { data: myproperty = [], isLoading } = useQuery({
        queryKey: ['myproperty', user.email],
        queryFn: () => axiosInstance(`/property?sellerEmail=${user.email}`).then((res) => res.data),
    });

    if (isLoading) return <Loader />;



    return (
        <div className={`min-h-screen py-10 ${theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-gray-100'}`}>
            <div className="md:max-w-10/12 mx-auto px-4">
                <p className="text-center text-3xl text-[#1563DF] font-bold tracking-wider">My Properties</p>
                <div className={`text-center mt-2 tracking-wide font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Manage and explore all your properties in one place — effortlessly track, update, and showcase your listings.
                </div>



                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
                    {myproperty.map((p) => (
                        <div
                            key={p._id}
                            className={`flex flex-col md:flex-row rounded-xl overflow-hidden shadow-sm transition-all duration-300 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700`}
                        >

                            <div className="w-full md:w-2/5 relative h-50 md:h-auto">
                                <img src={p.image} alt={p.propertyName} className="w-full h-full object-cover" />

                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        {p.type === 'Sell' ? 'For Sale' : 'For Rent'}
                                    </span>
                                </div>
                            </div>


                            <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                                <div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {p.propertyName}
                                    </h3>


                                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 mb-4">
                                        <IconLocation size={18} />
                                        <span className="text-sm">{p.location}</span>
                                    </div>


                                    <div className="flex flex-wrap gap-6 text-gray-700 dark:text-gray-300 text-[15px] font-medium mb-5">
                                        <div className="flex items-center gap-1"><LuBedDouble size={18} /> Beds : {p.beds}</div>
                                        <div className="flex items-center gap-1"><LiaBathSolid size={18} /> Baths : {p.baths}</div>
                                        <div className="flex items-center gap-1"><TfiRulerAlt2 size={18} /> Size : {p.sqft} sqft</div>
                                    </div>


                                    <div className="flex flex-wrap gap-2 mb-5">
                                        <Link
                                            to={`/details/${p._id}`}
                                            className="flex-1 md:flex-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 text-sm"
                                        >
                                            <IconArrowForward /> Details
                                        </Link>

                                        <Link
                                            
                                            className="flex-1 md:flex-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition duration-200 text-sm"
                                        >
                                            <IconEdit /> Edit
                                        </Link>

                                        <button
                                            
                                            className="flex-1 md:flex-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/60 transition duration-200 text-sm"
                                        >
                                            <IconTrash /> Delete
                                        </button>
                                    </div>
                                </div>


                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={user?.photoURL || 'https://placehold.co/40x40/EFEFEF/333?text=A'}
                                            alt={user?.displayName}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {user?.displayName}
                                        </span>
                                    </div>

                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                        ${p.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {myproperty.length === 0 && <NoProperty></NoProperty>}
            </div>
        </div>
    );
};

export default MyProperty;
