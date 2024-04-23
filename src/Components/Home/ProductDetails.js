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
        {" "}
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
    console.log(order);
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
    <section className="py-16">
      <div className="lg:flex md:flex justify-center w-full px-4 py-6">
        {/* ===================================
            product details Section/Card
            ==================================== */}
        <div className="card rounded-none lg:w-4/6 md:w-3/4 w-full bg-white shadow-xl border border-green-600">
          <div className="bg-green-600">
            <h2 className="text-white text-center p-1 text-2xl font-semibold">
              Product Details
            </h2>
          </div>

          <div className="">
            <div className=" w-full bg-white mx-auto">
              <figure className="my-3">
                {" "}
                <img src={img} alt="tool" className="w-[50%]" />{" "}
              </figure>
              <div className="">
                <h2 className="text-xl text-center font-bold text-slate-500">
                  {name}
                </h2>
                <p className="text-center my-2 text-[15px]">
                  <span className="font-bold text-xl">$ {price} </span> / per
                  unit price
                </p>
                <div className="px-3">
                  <div className="text-[16px] flex justify-between mb-2">
                    <p className="">
                      <span className="font-semibold">Available Product:</span>{" "}
                      {availQuantity} piece
                    </p>
                    <p className="">
                      <span className="font-semibold">Minimum Order:</span>{" "}
                      {minOrderQuantity} piece
                    </p>
                  </div>

                  <p className="text-[15px] text-slate-600">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================
            purchase profile section/card
            ==================================== */}
        <div className="card lg:w-2/6 md:w-3/4 w-full bg-white shadow-xl mx-7 border border-green-600 rounded-none">
          <div className="bg-green-600">
            <h2 className="text-white text-center p-1 text-2xl font-semibold">
              Product Details
            </h2>
          </div>
          <div className="card-body py-2">
            <form onSubmit={handleSubmit}>
              {/* name field */}
              <div className="form-control w-full mb-3">
                <label className="label p-0">
                  <span className="text-[17px] mb-[3px] label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={displayName}
                  disabled
                  className="p-2 bg-slate-100 text-slate-700 px-4 text-[16px] border rounded-none border-black w-full "
                />
              </div>
              {/* email field */}
              <div className="form-control w-full mb-3">
                <label className="label p-0">
                  <span className="text-[17px] mb-[3px] label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={email}
                  disabled
                  className="bg-slate-100 text-slate-700 p-2 px-4 text-[16px] border rounded-none border-black w-full "
                />
              </div>
              {/* product name field */}
              <div className="form-control w-full mb-3">
                <label className="label p-0">
                  <span className="text-[17px] mb-[3px] label-text">
                    Product Name
                  </span>
                </label>
                <input
                  type="text"
                  name="productName"
                  defaultValue={name}
                  disabled
                  className="bg-slate-100 text-slate-700 p-2 px-4 text-[16px] border rounded-none border-black w-full "
                />
              </div>
              {/* address field */}
              <div className="form-control w-full mb-3">
                <label className="label p-0">
                  <span className="text-[17px] mb-[3px] label-text">
                    Address
                  </span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Your Address"
                  required
                  className="bg-white input text-[16px] border rounded-none border-black w-full "
                />
              </div>
              {/* contact field */}
              <div className="form-control w-full mb-3">
                <label className="label p-0">
                  <span className="text-[17px] mb-[3px] label-text">
                    Contact
                  </span>
                </label>
                <input
                  type="number"
                  name="contact"
                  placeholder="Your Contact Number"
                  required
                  className="bg-white input text-[16px] border rounded-none border-black w-full "
                />
              </div>
              <div className="form-control w-full mb-3">
                <label className="label p-0">
                  <span className="text-[17px] mb-[3px] label-text">
                    Quantity
                  </span>
                </label>
                <input
                  className="bg-white input text-[16px] border rounded-none border-black w-full "
                  type="number"
                  name="quantity"
                  placeholder="Order Quantity"
                  defaultValue={minOrderQuantity}
                  required
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {" "}
                  {errorElement}{" "}
                </span>
              </label>
              <input
                className="btn bg-blue-600 text-white border-blue-900 hover:text-orange-500 lg:mt-0 w-full my-4"
                type="submit"
                value="Order Now"
                disabled={
                  quantity < parseInt(minOrderQuantity) ||
                  quantity > parseInt(availQuantity)
                }
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
