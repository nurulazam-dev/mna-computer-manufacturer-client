import { useState } from "react";
import { useQuery } from "react-query";
import Product from "../Components/Home/Product";
import PageTitle from "../Components/Shared/PageTitle";
import { BASE_URL } from "../config";
import ProductSkeleton from "../Components/Shared/ProductSkeleton";

const LIMIT = 10;

const AllProduct = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery(
    ["products", page, search, sortOrder],
    async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
        search: search.trim(),
        sortBy: "createdAt",
        sortOrder,
      });

      const response = await fetch(`${BASE_URL}/products?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    },
    {
      keepPreviousData: true,
    },
  );

  const productList = products?.data || [];
  const meta = products?.meta;

  const totalPages = meta?.totalPages || 1;

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSort = (value) => {
    setSortOrder(value);
    setPage(1);
  };

  if (isError) {
    return (
      <p className="text-center text-red-500 my-10">
        {error?.message || "Something went wrong while loading products."}
      </p>
    );
  }

  return (
    <section className="my-10 px-5 pt-8">
      <PageTitle title="Products" />

      <h2 className="text-center text-4xl my-3 text-green-600 font-bold">
        Manufacturer Parts / Products
      </h2>

      <hr />

      {/* Search and Filtering */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-7">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search products..."
          className="input input-bordered bg-white text-slate-700 w-full md:max-w-md"
        />

        <select
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className="select select-bordered w-full bg-white md:max-w-xs"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Products */}
      {isFetching && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Updating products...
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-7 gap-5">
        {isLoading ? (
          Array.from({ length: LIMIT }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : productList.length > 0 ? (
          productList.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 my-12">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1 || isFetching}
            className="btn btn-outline btn-sm text-slate-700"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                disabled={isFetching}
                className={`btn btn-sm ${
                  page === pageNumber
                    ? "btn-success text-white"
                    : "btn-outline text-slate-700"
                }`}
              >
                {pageNumber}
              </button>
            ),
          )}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages || isFetching}
            className="btn btn-outline btn-sm text-slate-700"
          >
            Next
          </button>
        </div>
      )}

      {/* Pagination Information */}
      {meta && (
        <p className="text-center text-sm text-gray-600 mt-4">
          Showing {productList.length} of {meta.total} products
          {" | "}
          Page {meta.page} of {meta.totalPages}
        </p>
      )}
    </section>
  );
};

export default AllProduct;
