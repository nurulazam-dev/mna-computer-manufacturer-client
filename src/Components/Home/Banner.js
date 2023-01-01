import React from 'react';
import bannerImg from '../../assets/banner/BennarImg.jpg'

const Banner = () => {
    return (
        <div>
            <img src={bannerImg} alt="" className="w-full" />
        </div>
    );
};

export default Banner;