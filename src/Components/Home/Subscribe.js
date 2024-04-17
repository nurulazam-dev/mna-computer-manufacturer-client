import React from "react";

const Subscribe = () => {
  return (
    <section
      style={{ backgroundColor: "#130342", backgroundSize: "cover" }}
      className="p-10 mb-12 text-white "
    >
      <div className="w-full flex_block">
        <div>
          <h3 className="text-3xl font-semibold mb-2">
            Sign Up For Newsletters
          </h3>
          <p>
            Get E-mail updates about our latest shop and{" "}
            <a href="/products" className="text-orange-500 font-semibold">
              special offers
            </a>
          </p>
        </div>
        <div className="w-96 flex mt-5 md:mt-2 lg:mt-0">
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
