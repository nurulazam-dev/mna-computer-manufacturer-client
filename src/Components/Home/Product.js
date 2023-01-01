import React from 'react';
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const { _id, img, name, description, minOrderQuantity, availQuantity, price } = product;
    const navigate = useNavigate();
    const handlePurchase = (_id) => {
        navigate(`/product/purchase/${_id}`);
    };

    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <figure className="px-6" style={{height: '300px'}}>
                <img src={img} alt="Product" className="rounded-xl" />
            </figure>
            <div className="card-body mt-0 pt-0 text-[16px]">
                <h2 className="text-2xl text-center font-bold text-primary">{name}</h2>
                <p className=''><span className='font-bold text-xl'>$ {price} </span> /per unit price</p>
                <p className=''><span className='font-semibold'>Details:</span> {description.slice(0,70)} ...</p>
                <p className=''><span className='font-semibold'>Available Product:</span> {availQuantity} piece</p>
                <p className=''><span className='font-semibold'>Minimum Order:</span> {minOrderQuantity} piece</p>

                <div className="card-actions justify-center">
                    <button
                        onClick={() => handlePurchase(_id)}
                        className="btn btn-outline border-blue-700  w-full max-w-xs my-2">
                        Purchase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;