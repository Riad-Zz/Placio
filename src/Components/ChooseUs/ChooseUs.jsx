import React, { use } from 'react';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import photo from '../../assets/Why.png'
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiShakeHandsLine } from "react-icons/ri";

const ChooseUs = () => {
    const { theme } = use(AuthContext)

    const cardStyle =
        theme === "dark"
            ? "flex items-start gap-4 border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl py-8 px-6 hover:from-gray-800 hover:to-gray-700 hover:border-[#1563DF]/70 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-[#1563DF]/20"
            : "flex items-start gap-4 border border-gray-200 bg-gradient-to-br from-white to-gray-50 rounded-2xl py-8 px-6 hover:border-[#1563DF]/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-sm";

    const textColor =
        theme === "dark"
            ? "text-gray-300"
            : "text-gray-600";

    const titleColor =
        theme === "dark"
            ? "text-white"
            : "text-gray-900";

    return (
        <div className='max-w-10/12 mx-auto'>
            <p className='text-center text-[#1563DF] font-bold tracking-wider mt-20'>OUR BENEFIT</p>
            <p className='text-4xl font-semibold text-center my-2'>
                Why Choose Placio
            </p>
            <div className='flex flex-col lg:flex-row justify-between mt-10 items-center'>
                <div>
                    <img src={photo} alt="" className='max-h-180' />
                </div>

                <div className='flex flex-col gap-6'>

                    {/* Card 1 */}
                    <div className={cardStyle}>
                        <div>
                            <VscWorkspaceTrusted className='text-4xl text-[#1563DF]' />
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${titleColor}`}>Proven Expertise</p>
                            <div className="w-14 h-[3px] bg-[#1563DF] rounded-full my-2"></div>
                            <p className={`max-w-xl ${textColor}`}>
                                Our seasoned team excels in real estate with years of
                                successful market navigation, offering informed decisions and optimal results.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className={cardStyle}>
                        <div>
                            <FaPeopleGroup className='text-4xl text-[#1563DF]' />
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${titleColor}`}>Client-Centered Approach</p>
                            <div className="w-14 h-[3px] bg-[#1563DF] rounded-full my-2"></div>
                            <p className={`max-w-xl ${textColor}`}>
                                We prioritize your needs at every step, ensuring smooth communication,
                                transparency, and a stress-free experience throughout.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className={cardStyle}>
                        <div>
                            <RiShakeHandsLine className='text-4xl text-[#1563DF]' />
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${titleColor}`}>Trusted Network</p>
                            <div className="w-14 h-[3px] bg-[#1563DF] rounded-full my-2"></div>
                            <p className={`max-w-xl ${textColor}`}>
                                Gain access to a broad network of verified buyers, sellers, and agents who
                                help make your property journey seamless and successful.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChooseUs;
