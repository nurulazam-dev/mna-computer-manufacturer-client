import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  // const { _id, img, name, description, minOrderQuantity, availQuantity, price } = product;
  const { _id, img, name, minOrderQuantity, price } = product;
  const navigate = useNavigate();
  const handlePurchase = (_id) => {
    navigate(`/product/purchase/${_id}`);
  };

  return (
    <div className="card lg:max-w-lg bg-white border rounded-none shadow-xl">
      <figure className="px-6" style={{ height: "205px" }}>
        <img src={img} alt="Product" className="rounded-xl h-[200px]" />
      </figure>
      <div className="card-body mt-0 py-1">
        <h2 className="text-[18px] text-center font-semibold text-slate-800">
          {name.length < 23 ? name : name.slice(0, 22) + "..."}
        </h2>

        <p className="text-sm leading-none">
          <span className="font-bold text-xl text-slate-600">$ {price} </span>{" "}
          /per unit
        </p>
        {/* <p className='text-sm'>{description.slice(0,60)} ...</p> */}

        <p className="text-sm leading-none">
          Minimum Order: {minOrderQuantity} piece
        </p>

        <div className="card-actions justify-center">
          <button
            onClick={() => handlePurchase(_id)}
            className="btn btn-outline border-blue-700 text-blue-700 w-full max-w-sm my-2 hover:border-black hover:bg-orange-400 hover:text-black"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
