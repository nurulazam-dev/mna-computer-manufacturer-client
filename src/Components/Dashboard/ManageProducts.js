import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";
import React, { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 10;

const ManageProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch("https://mna-computer-manufacturer.onrender.com/products").then(
      (res) => res.json()
    )
  );

  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleDelete = (_id) => {
    const proceed = window.confirm("Are you sure to Delete this product?");
    if (proceed) {
      const url = `https://mna-computer-manufacturer.onrender.com/products/${_id}`;
      fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("Product deleted successfully");
            refetch();
          } else {
            toast.error("Failed to delete product");
          }
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="border border-green-600 rounded mx-4 bg-white shadow-lg">
      <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-t">
        <h2 className="text-white text-center p-3 text-2xl font-bold tracking-wide">
          Manage Products ({products?.length})
        </h2>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 mt-4">
        <h2 className="text-xl font-semibold text-green-700">
          Search Result: {filteredProducts?.length}
        </h2>
        <input
          type="text"
          placeholder="Search by product name..."
          className="input input-bordered w-full md:w-80 bg-white focus:ring-2 focus:ring-green-400"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto px-4 mt-4">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                S. No
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Avatar
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Product / Part
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Min Order
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Available
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Price <span className="text-sm">/per</span>
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product, index) => (
                <tr key={product._id} className="hover:bg-green-50 transition">
                  <td className="px-4">
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="px-4">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-xl border border-green-200 shadow">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 text-gray-800 truncate max-w-xs">
                    {product.name.slice(0, 30)}
                  </td>
                  <td className="px-4">{product.minOrderQuantity}</td>
                  <td className="px-4">{product.availQuantity}</td>
                  <td className="px-4">${product.price}</td>
                  <td className="px-4 text-center">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded shadow transition"
                      title="Delete Product"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 my-6">
          <button
            className="btn btn-xs md:btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`btn btn-xs md:btn-sm ${
                currentPage === idx + 1 ? "btn-success text-white" : "btn-ghost"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="btn btn-xs md:btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default ManageProducts;
