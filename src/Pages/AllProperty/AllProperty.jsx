import React, { use, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import Typewriter from "typewriter-effect";
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/Axios/useAxios';
import PropertyCard from '../../Components/RecentProperty/PropertyCard';
import Loader from '../../Components/Loader/Loader';
import Cards from './Cards';

const AllProperty = () => {
    const { theme } = use(AuthContext);
    const words = ['Home', 'Office', 'Studio'];
    const axiosInstance = useAxios();

    const [searchQuery, setSearchQuery] = useState('');

    //-------------All Property Data fetch---------------------
    const { data: allProp = [], isLoading, isError, isFetching } = useQuery({
        queryKey: ['allproduct'],
        queryFn: () => axiosInstance.get('/allproperty').then(res => res.data),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    });

    // Filtered properties based on search
    const filteredProperties = allProp.filter(prop =>
        prop.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // console.log(filteredProperties)
    // console.log(allProp)

    return (
        <div className='max-w-11/12 md:max-w-10/12 mx-auto mt-5 mb-20'>
            <p className='text-center text-4xl text-[#1563DF] font-bold tracking-widest'>ALL PROPERTY</p>
            <div className={`text-center mt-2 tracking-wide font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                Discover Placio's all Properties for Your Dream{' '}
                <span className="text-blue-400 inline-block">
                    <Typewriter
                        options={{
                            strings: words,
                            autoStart: true,
                            loop: true,
                            pauseFor: 2000,
                            delay: 100,
                            deleteSpeed: 50,
                        }}
                    />
                </span>
            </div>


            {/* Search Bar */}
            <div className='flex justify-center mt-8'>
                <input
                    type="text"
                    placeholder="Search property..."
                    className={`w-full md:w-1/2 py-3 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1563DF] transition-all ${theme === 'dark'
                        ? 'bg-[#2A2A2A] text-white border-gray-600 placeholder-gray-400'
                        : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'
                        }`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Property Cards */}
            {isLoading ? (
                <Loader />
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10'>
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map(data => <Cards key={data._id} data={data} />)
                    ) : (
                        <p className={`min-h-screen col-span-full text-center mt-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                            No properties found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllProperty;
