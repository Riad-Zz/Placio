import React, { use } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { LuRuler } from "react-icons/lu";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { IoLocationOutline } from "react-icons/io5";
import { LuBedDouble } from "react-icons/lu";
import { LiaBathSolid } from "react-icons/lia";
import { TfiRulerAlt2 } from "react-icons/tfi";

const PropertyCard = ({ data }) => {
    const { theme } = use(AuthContext);

    // Base colors
    const cardBg = theme === "dark" ? "bg-[#2A2A2A] text-white" : "bg-white text-gray-900";
    const labelBg = theme === "dark" ? "bg-blue-500 text-white" : "bg-blue-600 text-white";
    const typeLabelBg = theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-900 text-white";
    const locationBg = theme === "dark" ? "bg-black/60 text-white" : "bg-black/40 text-white";
    const infoText = theme === "dark" ? "text-white" : "text-black";
    const priceText = theme === "dark" ? "text-white" : "text-black";

    return (
        <div className={`w-full shadow-sm rounded-xl overflow-hidden ${cardBg} cursor-pointer`}>

            {/* Image Section */}
            <div className="relative">
                <img
                    src={data.image}
                    alt={data.propertyName}
                    className="w-full h-60 md:h-70 object-cover hover:scale-105 transition-all duration-700"
                />

                {/* Labels */}
                <div className="absolute top-3 left-3 flex gap-2">

                    <span className={`text-xs px-5 py-2 rounded-full ${labelBg}`}>
                        Featured
                    </span>

                    <span className={`text-xs px-5 py-2 rounded-full ${typeLabelBg}`}>
                        {data.type === "Sell" ? "For Sale" : "For Rent"}
                    </span>
                </div>

                {/* Location */}
                <p className={`absolute flex items-center gap-2 font-semibold bottom-3 left-3 text-sm px-2 py-1 rounded ${locationBg}`}>
                    <IoLocationOutline></IoLocationOutline> {data.location}
                </p>
            </div>

            {/* Info Section */}
            <div className="p-4">
                <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {data.propertyName}
                </h2>

                <div className={`flex items-center gap-4 text-sm mt-3 ${infoText}`}>
                    <div className="flex items-center gap-1">
                        <LuBedDouble></LuBedDouble> Beds : <span className="font-bold">{data.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <LiaBathSolid></LiaBathSolid>Baths : <span className="font-bold">{data.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <TfiRulerAlt2></TfiRulerAlt2>Sqrt : <span className="font-bold">{data.sqft}</span>
                    </div>
                </div>
                <hr className="my-5 text-gray-400" />

                {/* Bottom section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={data.sellerImage || "https://i.pravatar.cc/150?img=3"}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className={`text-md font-semibold ${infoText}`}>{data.sellerName}</span>
                    </div>
                    <span className={`font-bold text-lg ${priceText}`}>
                        ${data.price}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
