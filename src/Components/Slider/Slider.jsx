// src/Components/Slider/Slider.jsx
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, EffectFade, Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

const Slider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const mainImages = [
        "./slider-5.jpg",
        "./slider-5-1.jpg",
        "./slider-5-2.jpg",
        "./slider-5-3.jpg",
    ];

    const thumbs = [
        "./slider-pagi.jpg",
        "./slider-pagi2.jpg",
        "./slider-pagi3.jpg",
        "./slider-pagi4.jpg",
    ];

    const words = ["Sanctuary", "Safe House"];

    return (
        <section className="relative w-full lg:rounded-xl lg:max-w-11/12 xl:max-w-10/12 mx-auto h-[85vh] overflow-hidden mt-3">
            {/* Navigation Arrows */}
            <div className="absolute z-30 top-1/2 left-1 -translate-y-1/2 cursor-pointer custom-prev text-white text-5xl">
                ‹
            </div>
            <div className="absolute z-30 top-1/2 right-1 -translate-y-1/2 cursor-pointer custom-next text-white text-5xl">
                ›
            </div>

            {/* Main Slider */}
            <Swiper
                modules={[Thumbs, EffectFade, Autoplay, Navigation]}
                thumbs={{ swiper: thumbsSwiper }}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                speed={1000}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                className="w-full h-full"
            >
                {mainImages.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <img
                            src={img}
                            alt={`slide-${idx}`}
                            className="w-full h-full object-cover lg:rounded-xl"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/18 z-10 lg:rounded-xl"></div>

            {/* Overlay content */}
            <div className="absolute inset-0 z-20 flex flex-col xl:max-w-9/12 xl:mx-auto xl:flex-row items-center justify-center xl:justify-between px-4 md:px-16 lg:px-24 h-full">
                {/* Left column: Text */}
                <div className="max-w-xl text-white flex flex-col justify-center text-center xl:text-left space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[80px] font-bold">
                        Indulge in Your
                        <br />
                        <span className="text-[#1563DF]">
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
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg xl:text-xl">
                        Discover your private oasis at Homelengo, where every corner, from the
                        spacious garden to the relaxing pool, is crafted for your comfort and
                        enjoyment.
                    </p>
                    <div className="flex flex-wrap justify-center xl:justify-start gap-3">
                        {["Houses", "Villa", "Office", "Apartments"].map((item, i) => (
                            <a
                                key={i}
                                href="#"
                                className="text-white px-4 py-2 rounded-2xl transition bg-black/40 backdrop-blur-sm hover:bg-black/60"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="hidden xl:flex flex-col mt-6 xl:mt-0 xl:ml-8 gap-5 items-center justify-start w-auto">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        direction="vertical"
                        slidesPerView={4}
                        spaceBetween={12}
                        freeMode
                        watchSlidesProgress
                        loop={true}
                        className="h-[350px] w-20 overflow-hidden"
                    >
                        {thumbs.map((img, idx) => (
                            <SwiperSlide key={idx} className="cursor-pointer">
                                <img
                                    src={img}
                                    alt={`thumb-${idx}`}
                                    className="w-full h-20 object-cover rounded-lg border-2 border-transparent hover:border-blue-400 transition"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Slider;
