import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../Firebase/firebase.init";
import { LOCAL_BASE_URL } from "../../config";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0);
  const { purchaseId } = useParams();
  const [user] = useAuthState(auth);
  let errorElement;

  const { data: product } = useQuery(["product", purchaseId], () =>
    fetch(`${LOCAL_BASE_URL}/product/purchase/${purchaseId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  const { displayName, email } = user || "";
  const {
    _id,
    img,
    name,
    description,
    minOrderQuantity,
    availQuantity,
    price,
  } = product || "";

  if (quantity > parseInt(availQuantity)) {
    errorElement = (
      <p className="text-red-500">
        Sorry! We can't process order more than available quantity.
      </p>
    );
  } else if (quantity < parseInt(minOrderQuantity) && quantity !== 0) {
    errorElement = (
      <p className="text-red-500">
        Sorry! You can not order less than minimum order quantity.
      </p>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const order = {
      product: _id,
      productName: name,
      customer: email,
      customerName: displayName,
      address: event.target.address.value,
      contact: event.target.contact.value,
      quantity: parseInt(quantity),
      price: parseInt(price),
      shouldPay: parseInt(price) * parseInt(quantity),
    };
    if (
      quantity > parseInt(minOrderQuantity) &&
      quantity <= parseInt(availQuantity)
    ) {
      fetch(`${LOCAL_BASE_URL}/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success(
              `Successfully ordered ${quantity} pcs of ${name}. Please pay ${order.shouldPay} to confirm your order.`
            );
            event.target.reset();
          }
        });
    } else if (quantity > parseInt(availQuantity)) {
      toast.error("Quantity can not be more than available quantity");
    } else if (quantity <= parseInt(minOrderQuantity)) {
      toast.error("Quantity can not be less than minimum order quantity");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-4">
        {/* Product Details Card */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <div className="w-56 h-56 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow mb-2">
              <img src={img} alt={name} className="object-contain h-50 w-50" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              {name}
            </h2>
            <p className="text-lg text-green-700 font-semibold mb-2">
              ${price}{" "}
              <span className="text-gray-500 text-base font-normal">
                / per unit
              </span>
            </p>
            <div className="flex gap-6 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Available: {availQuantity} pcs
              </span>
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                Min Order: {minOrderQuantity} pcs
              </span>
            </div>
            <p className="text-gray-600 text-center">{description}</p>
          </div>
        </div>

        {/* Order Form Card */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-extrabold text-green-700 mb-8 text-center tracking-tight">
            Order This Product
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                defaultValue={displayName}
                disabled
                className="peer w-full bg-gray-100 border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                Name
              </label>
            </div>
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                defaultValue={email}
                disabled
                className="peer w-full bg-gray-100 border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                Email
              </label>
            </div>
            {/* Product Name & Quantity */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Product Name */}
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  name="productName"
                  defaultValue={name}
                  disabled
                  className="peer w-full bg-gray-100 border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  placeholder=" "
                />
                <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                  Product Name
                </label>
              </div>
              {/* Quantity */}
              <div className="relative w-full md:w-1/2">
                <input
                  type="number"
                  name="quantity"
                  placeholder=" "
                  defaultValue={minOrderQuantity}
                  required
                  min={minOrderQuantity}
                  max={availQuantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="peer w-full bg-white border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
                <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                  Quantity
                </label>
                {errorElement && (
                  <span className="text-red-500 text-sm absolute left-0 -bottom-5">
                    {errorElement}
                  </span>
                )}
              </div>
            </div>
            {/* Address & Contact */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Address */}
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  name="address"
                  placeholder=" "
                  required
                  className="peer w-full bg-white border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
                <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                  Address
                </label>
              </div>
              {/* Contact */}
              <div className="relative w-full md:w-1/2">
                <input
                  type="number"
                  name="contact"
                  placeholder=" "
                  required
                  className="peer w-full bg-white border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
                <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                  Contact
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg shadow hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50"
              disabled={
                quantity < parseInt(minOrderQuantity) ||
                quantity > parseInt(availQuantity)
              }
            >
              Order Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
