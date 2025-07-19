import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { _id, img, name, minOrderQuantity, price } = product;

  const navigate = useNavigate();

  const handlePurchase = (_id) => {
    navigate(`/product/purchase/${_id}`);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 group overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
          ${price} /unit
        </span>
      </div>
      <figure className="flex items-center justify-center h-50 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="object-contain h-44 w-full transition-transform duration-300 group-hover:scale-105"
        />
      </figure>
      <div className="flex flex-col gap-1 p-2">
        <h2 className="text-lg font-bold text-gray-800 text-center truncate">
          {name}
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Minimum Order:{" "}
          <span className="font-semibold text-gray-700">
            {minOrderQuantity}
          </span>{" "}
          pcs
        </p>
        <div className="flex justify-center mt-3">
          <button
            onClick={() => handlePurchase(_id)}
            className="w-full max-w-xs py-2 px-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-lg shadow hover:from-orange-500 hover:to-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
