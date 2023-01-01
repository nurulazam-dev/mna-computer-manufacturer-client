import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "react-query";
import Loading from '../Shared/Loading';
import Product from './Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useQuery("products", () =>
    fetch("https://mna-computer-manufacturer.onrender.com/products").then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section className='m-2 p-3'>
      <div className='text-center mb-6'>
        <h2 className='text-4xl mb-2 text-orange-500 font-bold'>Products</h2>
        <h4 className='text-2xl'>Our available computer manufacturer parts / products</h4>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>

        {products.slice(0, 10).map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      <div className="card-actions justify-center mt-5">
        <button className="btn btn-outline border-green-700 text-xl w-full max-w-md my-2" onClick={() => navigate("products")}>
          All Products/Parts... <FontAwesomeIcon className='mx-4' icon={faArrowUpRightFromSquare}></FontAwesomeIcon>
        </button>
      </div>
    </section>
  );
};

export default Products;