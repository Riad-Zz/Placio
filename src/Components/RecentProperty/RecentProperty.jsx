import React, { use, useEffect } from 'react';
import useAxios from '../../Hooks/Axios/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import PropertyCard from './PropertyCard';
import Loader from '../Loader/Loader';
import SmallLoader from '../Loader/SmallLoader'
import { GoArrowUpRight } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router';

const RecentProperty = () => {
    const axiosInstance = useAxios();
    const {theme} = use(AuthContext) ;

    // useEffect(()=>{
    //     axiosInstance.get('/recentproperty')
    //     .then(data => {
    //         const info = data.data ;
    //         // console.log(info) ;
    //         setRecentProp(info) ;
    //     })
    // },[])

    const buttonConfig =
        theme === "dark"
            ? "flex cursor-pointer text-[16px] font-semibold items-center gap-2 px-5 py-3 border border-[#1563DF] rounded-3xl transition-all hover:bg-transparent hover:border-white hover:text-white text-white bg-[#1563DF]"
            : "flex  cursor-pointer text-[16px] font-semibold items-center gap-2 px-5 py-3 border border-[#1563DF] rounded-3xl transition-all hover:bg-transparent  hover:text-black  text-white bg-[#1563DF]";

    //------------------Using TanStack Query------------------
    const { data: recentProp = [], isLoading, isError, isFetching } = useQuery({
        queryKey: ['recentproperties'],
        queryFn: () => axiosInstance.get('/recentproperty').then(res => res.data),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    });


    return (
        <div className='md:max-w-10/12 max-w-11/12 px-1 mx-auto mt-20'>

            <p className='text-center text-[#1563DF] font-bold tracking-wider'>RECENT PROPERTY</p>
            <p className='text-4xl font-semibold text-center my-2'>
                Discover PlaCio’s Recent <br />
                Properties for Your Dream Home
            </p>

            {
                isLoading ?
                    <Loader></Loader>
                    :
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6'>
                            {
                                recentProp.map(data => <PropertyCard key={data._id} data={data}></PropertyCard>)
                            }
                        </div>
                        <Link to={'/allproperty'}>
                        <div className="mt-10 mb-5 flex justify-center ">
                            <button className={`${buttonConfig}`}>View All Property <FaArrowRightLong className='text-xl'></FaArrowRightLong> </button>
                        </div>
                        </Link>
                    </>



            }


        </div>

    );
};

export default RecentProperty;