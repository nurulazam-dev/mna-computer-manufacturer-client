import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  // const { _id, img, name, description, minOrderQuantity, availQuantity, price } = product;
  const { _id, img, name, minOrderQuantity, availQuantity, price } = product;
  const navigate = useNavigate();
  const handlePurchase = (_id) => {
    navigate(`/product/purchase/${_id}`);
  };

  return (
    <div className="card lg:max-w-lg bg-white border rounded-none shadow-xl">
      <figure className="px-6" style={{ height: "300px" }}>
        <img src={img} alt="Product" className="rounded-xl h-[295px]" />
      </figure>
      <div className="card-body mt-0 py-1 ">
        <h2 className="text-xl text-center font-bold text-primary">{name}</h2>
        <p className="text-sm">
          <span className="font-bold text-xl">$ {price} </span> /per unit
        </p>
        {/* <p className='text-sm'>{description.slice(0,60)} ...</p> */}
        <p className="text-sm">Available Product: {availQuantity} piece</p>
        <p className="text-sm">Minimum Order: {minOrderQuantity} piece</p>

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
