import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../Firebase/firebase.init";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0);
  const { purchaseId } = useParams();
  const [user] = useAuthState(auth);
  let errorElement;

  const { data: product } = useQuery(["product", purchaseId], () =>
    fetch(
      `https://mna-computer-manufacturer.onrender.com/product/purchase/${purchaseId}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
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
      fetch(`https://mna-computer-manufacturer.onrender.com/order`, {
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
              `You have ordered ${quantity} pieces. Please go to My orders page to complete the payment`
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
        <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-green-700 mb-6 text-center">
            Order This Product
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={displayName}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={email}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
              />
            </div>
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                defaultValue={name}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
              />
            </div>
            {/* Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            {/* Contact */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Contact
              </label>
              <input
                type="number"
                name="contact"
                placeholder="Your Contact Number"
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            {/* Quantity */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Order Quantity"
                defaultValue={minOrderQuantity}
                required
                min={minOrderQuantity}
                max={availQuantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2"
              />
              {errorElement && (
                <span className="text-red-500 text-sm">{errorElement}</span>
              )}
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
