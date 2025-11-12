import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Temp from '../../Components/Temp/Temp';
import RecentProperty from '../../Components/RecentProperty/RecentProperty';
import Agent from '../../Components/Agent/Agent';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            {/* <Temp></Temp> */}
            <RecentProperty></RecentProperty>
            <Agent></Agent>
        </div>
    );
};

export default Home;