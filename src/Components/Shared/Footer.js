import React from 'react';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <footer className='py-5 bg-black opacity-100'>
            {/* <div className="md:place-self-center text-center text-white md:justify-self-end"> */}
                {/* <div className="grid grid-flow-col gap-4"> */}
                <div className="flex_block text-white text-center text-[13px] md:text-[14px] lg:text-[15px]">
                    <p>MNA COMPUTER MANUFACTURER</p>
                    <p> All Rights Reserved . Copyright © {year}  </p>
                    <p> Designed by @mnaofficialbd </p>
                </div>
            {/* </div> */}
        </footer>
    );
};

export default Footer;