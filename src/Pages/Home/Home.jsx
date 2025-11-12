import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Temp from '../../Components/Temp/Temp';
import RecentProperty from '../../Components/RecentProperty/RecentProperty';
import Agent from '../../Components/Agent/Agent';
import Services from '../../Components/Services/Services';
import ChooseUs from '../../Components/ChooseUs/ChooseUs';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            {/* <Temp></Temp> */}
            <RecentProperty></RecentProperty>
            <Services></Services>
            <ChooseUs></ChooseUs>
            <Agent></Agent>
        </div>
    );
};

export default Home;