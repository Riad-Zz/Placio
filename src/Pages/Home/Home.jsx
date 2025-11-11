import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Temp from '../../Components/Temp/Temp';
import RecentProperty from '../../Components/RecentProperty/RecentProperty';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            {/* <Temp></Temp> */}
            <RecentProperty></RecentProperty>
        </div>
    );
};

export default Home;