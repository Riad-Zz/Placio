import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { use, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../Hooks/Axios/useAxios';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import { IoLocationOutline, IoStarOutline } from "react-icons/io5";
import { LuBedDouble } from "react-icons/lu";
import { LiaBathSolid } from "react-icons/lia";
import { TfiRulerAlt2 } from "react-icons/tfi";
import Loader from '../Loader/Loader';
import { IoHomeOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { BiBath } from "react-icons/bi";
import { PiResize } from "react-icons/pi";
import { PiHammerLight } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";
// import Rating from 'react-rating';

import { IoIosStarOutline } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { Rating, Box, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from 'react-toastify';




const PropertyDetails = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const axiosInstance = useAxios();
    const { theme, user } = use(AuthContext);
    const ratingRef = useRef(null);
    const [rating, setRating] = useState(0);
    const [desc, setDesc] = useState("");
    const proId = id.slice(0, 4)
    const infoText = theme === "dark" ? "text-gray-300" : "text-gray-600";


    //------------------Rating Posting------------------------
    const ratingMutation = useMutation({
        mutationFn: (newRating) =>
            axiosInstance.post('/rating', newRating).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['rating' , user.email]);
        }
    });

    //-------------------------get Property Details---------------------------
    const { data: product = {}, isLoading } = useQuery({
        queryKey: [id],
        queryFn: () => axiosInstance(`/property/${id}`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    });

    //-------------------------Rating Control---------------------------------
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (ratingRef.current && !ratingRef.current.contains(event.target)) {
                setRating(0);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);


    const {
        propertyName,
        location,
        category,
        sellerContact,
        type,
        price,
        image,
        sellerEmail,
        sellerName,
        sellerImage,
        beds,
        baths,
        sqft,
        description,
        buildYear,

    } = product;

    if (isLoading) {
        return <Loader></Loader>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const today = new Date().toISOString().split("T")[0];

        const newRating = {
            rating,
            description: desc,
            propertyId : id,
            propertyImage: image,
            productName: propertyName,
            Reviewer: user.email,
            ReviewDate: today,
            ReviewerName: user.displayName,
        };

        //--------------------Calling the Mutation to post--------------------------
        ratingMutation.mutate(newRating, {
            onSuccess: (data) => {
                if(data.insertedId){
                    toast.success("Review Added Succesfully !" , {theme : 'colored'})
                }
                setRating(0);
                setDesc("");
            }
        });
    };

    return (
        <div
            className={`
            ${theme === "dark" ? "" : "bg-[#FEFEFE] text-gray-900"}`}
        >
            <div className='md:max-w-10/12 mx-auto p-4 md:p-8 transition-all duration-300'>
                {/*-----------------Title + Price-------------------------*/}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        {propertyName}
                    </h1>

                    <p className="text-3xl font-semibold text-[#1563DF]">
                        ${price}
                        {type?.toLowerCase() === "rent" && (
                            <span className="text-lg text-gray-500"> /month</span>
                        )}
                    </p>
                </div>

                <hr className='text-gray-200 my-5' />
                <div className='flex gap-4 md:items-center flex-col md:flex-row md:gap-30'>
                    <div>
                        <p className={`text-lg font-semibold ${theme === 'dark' ? "text-gray-100" : 'text-gray-600'}`}>Feature</p>
                        <div className={`flex flex-wrap items-center gap-4 text-sm mt-3 ${infoText}`}>
                            <div className="flex items-center gap-1">
                                <LuBedDouble></LuBedDouble> Beds : <span className="font-bold">{beds}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <LiaBathSolid></LiaBathSolid>Baths : <span className="font-bold">{baths}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <TfiRulerAlt2></TfiRulerAlt2>Sqrt : <span className="font-bold">{sqft}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className={`text-lg font-semibold ${theme === 'dark' ? "text-gray-100" : 'text-gray-600'}`}>Location</p>
                        <div
                            className={`mt-2 flex flex-wrap gap-4 text-sm 
                ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                        >
                            <span className={`${infoText} flex items-center gap-2`}><IoLocationOutline></IoLocationOutline> {location}</span>
                        </div>
                    </div>

                </div>








                {/*-----------------------------Main Image------------------------------------*/}
                <div className="mt-6">
                    <img
                        src={image}
                        alt={propertyName}
                        className="w-full  object-cover rounded-xl shadow-lg"
                    />
                </div>

                {/*------------------------------Description---------------------------------------------*/}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>

                    <p
                        className={`leading-relaxed 
                    ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                        {description}
                    </p>
                </div>


                <div className='grid grid-cols-1 xl:grid-cols-3'>
                    {/*-------------------------------------Overview-----------------------------------------------*/}
                    <div className="mt-8 lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-6">Overview</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">

                            {/* ITEM 1 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center 
        transition group hover:border-[#1563DF] hover:bg-[#1563DF] hover:text-white cursor-pointer">
                                    <IoHomeOutline className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">ID:</p>
                                    <p className="font-semibold text-base">{proId}</p>
                                </div>
                            </div>

                            {/* ITEM 2 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center
        transition hover:border-[#1563DF] hover:bg-[#1563DF] hover:text-white cursor-pointer">
                                    <VscSettings className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Type:</p>
                                    <p className="font-semibold text-base">{type}</p>
                                </div>
                            </div>

                            {/* ITEM 3 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center
        transition hover:border-[#1563DF] hover:bg-[#1563DF] hover:text-white cursor-pointer">
                                    <LuBedDouble className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Bedrooms:</p>
                                    <p className="font-semibold text-base">{beds} Rooms</p>
                                </div>
                            </div>

                            {/* ITEM 4 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center
        transition hover:border-[#1563DF] hover:bg-[#1563DF] hover:text-white cursor-pointer">
                                    <BiBath className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Bathrooms:</p>
                                    <p className="font-semibold text-base">2 Rooms</p>
                                </div>
                            </div>

                            {/* ITEM 5 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center
        transition hover:border-[#1563DF] hover:bg-[#1563DF] hover:text-white cursor-pointer">
                                    <PiResize className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Land Size:</p>
                                    <p className="font-semibold text-base">{sqft} sqft</p>
                                </div>
                            </div>

                            {/* ITEM 6 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center
        transition hover:border-[#1563DF] hover:bg-[#1563DF] hover:text-white cursor-pointer">
                                    <PiHammerLight className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Year Built:</p>
                                    <p className="font-semibold text-base">{buildYear}</p>
                                </div>
                            </div>

                            {/* ITEM 7 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center
        transition hover:border-[#1563DF] hover:bg-[#1563DF] hover:text-white cursor-pointer">
                                    <BiCategoryAlt className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Category</p>
                                    <p className="font-semibold text-base">{category}</p>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* Seller Section  */}

                    <div>

                        <div className="mt-10">
                            <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>

                            <div
                                className={`
      flex items-center gap-4 p-5 rounded-2xl shadow-sm transition-colors duration-300
      ${theme === "dark"
                                        ? "border border-gray-400 text-gray-200 "
                                        : "bg-white-100 border border-gray-300 text-gray-900 shadow-white "
                                    }
    `}
                            >
                                <img
                                    src={sellerImage}
                                    alt={sellerName}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                                />

                                <div>
                                    <p className="text-lg font-semibold">{sellerName}</p>
                                    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{sellerEmail}</p>
                                    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{sellerContact}</p>
                                </div>
                            </div>
                        </div>

                        {/* Rating  */}
                        <p className='mt-10 text-xl font-semibold py-5'>Submit Your Review</p>
                        <Paper
                            // subtle shadow like shadow-sm
                            sx={{

                                mx: "auto",
                                py: 3,
                                px: 3,
                                borderRadius: "10px", // 2xl
                                transition: "all 0.3s ease",
                                border: theme === "dark" ? "1px solid #6B7280" : "1px solid #D1D5DB", // gray-400 / gray-300
                                bgcolor: theme === "dark" ? "#2A2A2A" : "#FFFFFF",
                                color: theme === "dark" ? "#E0E0E0" : "#1A1A1A",
                            }}
                        >
                            <form
                                onSubmit={handleSubmit}
                                style={{ display: "flex", flexDirection: "column", gap: "24px" }}
                            >

                                {/* Rating */}
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Typography sx={{ minWidth: 60 }}>Rating:</Typography>
                                    <Rating
                                        name="custom-rating"
                                        value={rating}
                                        onChange={(event, newValue) => setRating(newValue)}
                                        precision={1}
                                        required
                                        size="large"
                                        sx={{
                                            color: "#FFA500",
                                        }}
                                    />
                                </Box>

                                {/* Description */}
                                <TextField
                                    label="Description"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={desc}
                                    required
                                    onChange={(e) => setDesc(e.target.value)}
                                    sx={{
                                        bgcolor: theme === "dark" ? "#3A3A3A" : "#F9F9F9",
                                        color: theme === "dark" ? "#E0E0E0" : "#1A1A1A",
                                        borderRadius: "1rem",
                                        "& .MuiInputBase-root": {
                                            color: theme === "dark" ? "#E0E0E0" : "#1A1A1A",
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: theme === "dark" ? "#555" : "#CCC",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#1563DF",
                                        },
                                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#1563DF",
                                        },
                                    }}
                                />

                                {/* Submit Button */}
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        bgcolor: "#1563DF",
                                        color: "#fff",
                                        fontWeight: 600,
                                        borderRadius: "1rem",
                                        "&:hover": { bgcolor: "#1563DF" },
                                    }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Paper>
                    </div>




                </div>




            </div>








        </div>
    );
};

export default PropertyDetails;
