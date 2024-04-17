import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import Product from "./Product";

const Products = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useQuery("products", () =>
    fetch(`https://mna-computer-manufacturer.onrender.com/products`).then(
      (res) => res.json()
    )
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section className="m-2 p-3">
      <div className="text-center mb-6">
        <h2 className="text-4xl mb-2 text-orange-500 font-bold">
          Our available Products
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.slice(0, 10).map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      <div className="card-actions justify-center mt-5">
        <button
          className="btn btn-outline border-green-700 text-xl text-green-800 w-full max-w-md my-2 hover:border-black hover:bg-orange-500 hover:text-black"
          onClick={() => navigate("products")}
        >
          All Products...
          <FontAwesomeIcon
            className="mx-4"
            icon={faArrowUpRightFromSquare}
          ></FontAwesomeIcon>
        </button>
      </div>
    </section>
  );
};

export default Products;
