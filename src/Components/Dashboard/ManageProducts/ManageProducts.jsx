import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { BASE_URL } from "../../../config";
import ManageProductsTableSkeleton from "./ManageProductsTableSkeleton";

const ITEMS_PER_PAGE = 10;
const SEARCH_DEBOUNCE = 400;

const ManageProducts = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(filter.trim());
      setCurrentPage(1);
    }, SEARCH_DEBOUNCE);

    return () => clearTimeout(timer);
  }, [filter]);

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(
    ["products", currentPage, ITEMS_PER_PAGE, search],
    async () => {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        search,
      });

      const response = await fetch(`${BASE_URL}/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      return response.json();
    },
    {
      keepPreviousData: true,
    },
  );

  const productList = productsResponse?.data || [];
  const meta = productsResponse?.meta;

  const totalProducts = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 1;

  const pageNumbers = useMemo(() => {
    const visiblePages = Math.min(totalPages, 5);

    const startPage = Math.max(
      1,
      Math.min(currentPage - 2, totalPages - visiblePages + 1),
    );

    return Array.from(
      { length: visiblePages },
      (_, index) => startPage + index,
    );
  }, [currentPage, totalPages]);

  // Delete product
  const handleDelete = async (id) => {
    const proceed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!proceed || deletingId) return;

    try {
      setDeletingId(id);

      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.deletedCount) {
        throw new Error(result.message || "Failed to delete product.");
      }

      toast.success("Product deleted successfully.");

      if (productList.length === 1 && currentPage > 1) {
        setCurrentPage((previousPage) => previousPage - 1);
      } else {
        refetch();
      }
    } catch (error) {
      console.error("Delete product error:", error);
      toast.error(error.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mx-4 rounded border border-green-600 bg-white shadow-lg">
      <div className="rounded-t bg-gradient-to-r from-green-700 to-green-600">
        <h2 className="p-3 text-center text-2xl font-bold tracking-wide text-white">
          Manage Products
        </h2>
      </div>

      {/* =====Search==== */}
      <div className="mt-4 flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold text-green-700">
          Search Result: {totalProducts}
        </h2>

        <input
          type="search"
          placeholder="Search by product name..."
          className="input input-bordered w-full bg-white focus:ring-2 focus:ring-green-400 md:w-80"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>

      {/* ======Table======= */}
      <div className="mt-4 overflow-x-auto px-4">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                S. No
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                Avatar
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                Product / Part
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                Min Order
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                Available
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                Price <span className="text-sm">/per</span>
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {isLoading || isFetching ? (
              <ManageProductsTableSkeleton />
            ) : isError ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-red-500">
                  {error?.message ||
                    "Something went wrong while fetching products."}
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="ml-2 font-semibold underline"
                  >
                    Retry
                  </button>
                </td>
              </tr>
            ) : productList.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              productList.map((product, index) => (
                <tr key={product._id} className="transition hover:bg-green-50">
                  <td className="px-4 py-3 text-base">
                    #{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>

                  <td className="px-4 py-3">
                    <div className="avatar">
                      <div className="h-10 w-10 rounded-xl border border-green-200 shadow">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </td>

                  <td className="max-w-xs truncate px-4 py-3 text-base text-gray-800">
                    {product.name?.slice(0, 30)}
                  </td>

                  <td className="px-4 text-base py-3">
                    {product.minOrderQuantity}
                  </td>
                  <td className="px-4 text-base py-3">
                    {product.availQuantity}
                  </td>
                  <td className="px-4 text-base py-3">${product.price}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId !== null}
                      className="btn btn-sm rounded bg-red-600 text-white shadow transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete Product"
                      aria-label={`Delete ${product.name}`}
                    >
                      {deletingId === product._id ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        <FontAwesomeIcon icon={faTrashAlt} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ====Pagination==== */}
      {!isLoading && !isError && totalPages > 1 && (
        <div className="my-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            className="btn btn-xs md:btn-sm"
            disabled={currentPage === 1 || isFetching}
            onClick={() =>
              setCurrentPage((previousPage) => Math.max(1, previousPage - 1))
            }
          >
            Prev
          </button>

          {pageNumbers.map((page) => (
            <button
              type="button"
              key={page}
              disabled={isFetching}
              className={`btn btn-xs md:btn-sm ${
                currentPage === page ? "btn-success text-white" : "btn-ghost"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="btn btn-xs md:btn-sm"
            disabled={currentPage >= totalPages || isFetching}
            onClick={() =>
              setCurrentPage((previousPage) =>
                Math.min(totalPages, previousPage + 1),
              )
            }
          >
            Next
          </button>
        </div>
      )}

      {!isLoading && !isError && totalProducts > 0 && (
        <p className="mb-4 text-center text-sm text-gray-500">
          Showing {productList.length} of {totalProducts} products
          {" | "}
          Page {currentPage} of {totalPages}
        </p>
      )}
    </section>
  );
};

export default ManageProducts;
