import React from "react";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="py-5 bg-black opacity-100">
      <div className="lg:flex justify-around items-center text-white text-center text-[13px] md:text-[14px] lg:text-[15px]">
        <p>MNA COMPUTER MANUFACTURER</p>
        <p> All Rights Reserved . Copyright © {year} </p>
        <p> Designed by @nurulazam-dev </p>
      </div>
    </footer>
  );
};

export default Footer;
