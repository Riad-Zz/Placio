import React, { use, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/Axios/useAxios";
import Loader from "../../Components/Loader/Loader";
import { Link, Navigate } from "react-router";
import NoRating from "./NoRating";

const MyRating = () => {
    const { user, theme } = use(AuthContext);
    const axiosInstance = useAxios();

    const { data: allratings = [], isLoading } = useQuery({
        queryKey: ["rating", user.email],
        queryFn: () => axiosInstance(`/rating?Reviewer=${user.email}`).then((res) => res.data),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-11/12 md:max-w-10/12 mx-auto mt-10">
            <p className="text-center text-3xl text-[#1563DF] font-bold tracking-wider">My Ratings & Reviews</p>
            <p className={`text-center mt-2 tracking-wide font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                Keep track of the properties you’ve rated and see all your feedback in one place.
            </p>

            {
                allratings.length == 0
                && <NoRating></NoRating>
            }
            <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4 gap-6 mt-10">


                {allratings.length > 0 &&
                    allratings.map((data) => (
                        <Link key={data.propertyId} to={`/details/${data.propertyId}`}>
                            <div

                                className={`flex flex-wrap flex-col cursor-pointer md:flex-row gap-4 p-5 md:items-center rounded-2xl shadow-sm transition-colors duration-300
              ${theme === "dark"
                                        ? "bg-[#2A2A2A] border border-gray-700 text-gray-200"
                                        : "bg-white border border-gray-200 text-gray-900"
                                    }
            `}
                            >

                                <img
                                    src={data.propertyImage}
                                    alt={data.productName}
                                    className="w-full md:w-40 md:h-32 object-cover rounded-xl border border-gray-300 shrink-0"
                                />


                                <div className="flex-1 flex flex-col gap-1">

                                    <div className="flex flex-col  gap-1">
                                        <h3 className="font-semibold text-lg">{data.productName}</h3>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-xl ${i < data.rating ? "text-yellow-400" : "text-gray-400"}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>


                                    <p className={`text-sm text-gray-500 dark:text-gray-400`}>
                                        Reviewed by <span className="font-medium">{data.ReviewerName}</span> on {data.ReviewDate}
                                    </p>


                                    <p className="mt-1 text-gray-800 dark:text-gray-200 leading-relaxed">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default MyRating;
