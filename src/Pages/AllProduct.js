import React from 'react';
import { useQuery } from "react-query";
import Loading from '../Components/Shared/Loading';
import Product from '../Components/Home/Product';
import PageTitle from '../Components/Shared/PageTitle';

const AllProduct = () => {
    const { data: products, isLoading } = useQuery("products", () =>
        fetch("https://mna-computer-manufacturer.onrender.com/products").then((res) => res.json())
    );
    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <section className='my-10 px-5 pt-8'>
            <PageTitle title='Products'></PageTitle>
            <h2 className='text-center text-4xl my-3 text-orange-600 font-bold'>Manufacturer Parts / Products</h2>
            <hr />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-7 gap-5'>
                {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                ))}
            </div>
        </section>
    );
};

export default AllProduct;