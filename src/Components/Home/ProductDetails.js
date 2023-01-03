import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(0);
    const { purchaseId } = useParams();
    const [user] = useAuthState(auth);
    let errorElement;

    const { data: product } = useQuery(["product", purchaseId], () =>
        fetch(`https://mna-computer-manufacturer.onrender.com/product/purchase/${purchaseId}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => res.json())
    );
    const { displayName, email } = user || "";
    const { _id, img, name, description, minOrderQuantity, availQuantity, price } = product || "";

    if (quantity > parseInt(availQuantity)) {
        errorElement = (
            <p className="text-red-500"> Sorry! We can't process order more than available quantity.</p>
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
        if (quantity > parseInt(minOrderQuantity) && quantity <= parseInt(availQuantity)) {
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
        <section className='py-16'>
            <div className='flex justify-center'>
                {/* ===================================
            product details Section/Card
            ==================================== */}
                <div className="card w-2/5 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className='text-center text-fuchsia-600 text-4xl font-semibold'>Product Details</h2>
                        <div className="card w-80 md:w-9/12 bg-base-100 mx-auto">
                            <figure> <img src={img} alt="tool" /> </figure>
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold text-primary">{name}</h2>
                                <p className=''><span className='font-bold text-2xl'>$ {price} </span> /per unit price</p>
                                <p className=''><span className='font-semibold'>Details:</span> {description}</p>
                                <p className=''><span className='font-semibold'>Available Product:</span> {availQuantity} piece</p>
                                <p className=''><span className='font-semibold'>Minimum Order:</span> {minOrderQuantity} piece</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================================
            purchase profile section/card
            ==================================== */}
                <div className="card w-2/6 bg-base-100 shadow-xl mx-7">
                    <div className="card-body">
                        <h2 className='text-center text-orange-500 text-4xl font-semibold'>Purchase Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="label"><span className="label-text font-semibold pl-3">Name</span></label>
                            <input type="text" name="name" className="input border-r-0 border-l-0 border-t-0 border-b-2 border-primary rounded-none w-full max-w-xs" defaultValue={displayName} disabled />
                            <label className="label"> <span className="label-text font-semibold pl-3">Email</span></label>
                            <input type="email" name="email"
                                className="input border-r-0 border-l-0 border-t-0 border-b-2 border-primary rounded-none w-full max-w-xs"
                                defaultValue={email} disabled />
                            <label className="label">
                                <span className="label-text font-semibold pl-3"> Product Name </span>
                            </label>
                            <input type="text" name="productName"
                                className="input border-r-0 border-l-0 border-t-0 border-b-2 border-primary rounded-none w-full max-w-xs"
                                defaultValue={name} disabled
                            />
                            <label className="label"> <span className="label-text font-semibold pl-3">Address</span> </label>
                            <input type="text" name="address" placeholder="Your Address"
                                className="input border-r-0 border-l-0 border-t-0 border-b-2 border-primary rounded-none w-full max-w-xs" required
                            />
                            <label className="label"> <span className="label-text font-semibold pl-3"> Contact No </span> </label>
                            <input type="number" name="contact" placeholder="Your Contact No"
                                className="input border-r-0 border-l-0 border-t-0 border-b-2 border-primary rounded-none w-full max-w-xs"
                            />
                            <label className="label">
                                <span className="label-text font-semibold pl-3">Quantity</span>
                            </label>
                            <input type="number" name="quantity" placeholder="Order Quantity"
                                className="input border-r-0 border-l-0 border-t-0 border-b-2 border-primary rounded-none w-full max-w-xs"
                                defaultValue={minOrderQuantity} required onChange={(e) => { setQuantity(e.target.value) }}
                            />
                            <label className="label">
                                <span className="label-text-alt text-red-500"> {" "} {errorElement} </span>
                            </label>
                            <input className="btn btn-primary w-full max-w-xs block my-4" type="submit"
                                value="Order Now" disabled={quantity < parseInt(minOrderQuantity) || quantity > parseInt(availQuantity)}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;