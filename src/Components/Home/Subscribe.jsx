import React from "react";

const Subscribe = () => {
  return (
    <section className="p-7 lg:p-10 mb-12 text-white bg-gradient-to-r to-violet-700 from-[#130342]">
      <div className="w-full lg:flex justify-around items-center">
        <div>
          <h3 className="text-2xl lg:text-3xl font-semibold mb-2">
            Sign Up For Newsletters
          </h3>
          <p className="text-lg lg:text-2xl">
            Get E-mail updates about our latest shop and{" "}
            <a href="/products" className="text-orange-500 font-semibold">
              special offers
            </a>
          </p>
        </div>
        <div className="w-[300px] lg:w-96 flex mt-5 md:mt-2 lg:mt-0">
          <input
            type="text"
            placeholder="Your email address"
            className="bg-white text-xl rounded-none input input-bordered w-full"
          />
          <button className="btn btn-success rounded-none">Sign Up</button>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
