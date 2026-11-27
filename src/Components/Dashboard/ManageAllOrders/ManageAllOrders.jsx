import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { BASE_URL } from "../../../config";
import ManageAllOrdersRow from "./ManageAllOrdersRow";
import ManageAllOrdersTableSkeleton from "./ManageAllOrdersTableSkeleton";

const ITEMS_PER_PAGE = 10;
const SEARCH_DEBOUNCE = 400;

const ManageAllOrders = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(filter.trim());
      setCurrentPage(1);
    }, SEARCH_DEBOUNCE);

    return () => clearTimeout(timer);
  }, [filter]);

  // Server-side pagination and search
  const {
    data: ordersResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(
    ["orders", currentPage, ITEMS_PER_PAGE, search],
    async () => {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        search,
      });

      const response = await fetch(`${BASE_URL}/orders?${params.toString()}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }

      return response.json();
    },
    {
      keepPreviousData: true,
    },
  );

  const orderList = ordersResponse?.data || [];
  const meta = ordersResponse?.meta;

  const totalOrders = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 1;

  // Display a maximum of five page buttons
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

  return (
    <section className="mx-4 rounded border border-green-600 bg-white shadow-lg">
      {/* Header */}
      <div className="rounded-t bg-gradient-to-r from-green-700 to-green-600">
        <h2 className="p-3 text-center text-2xl font-bold tracking-wide text-white">
          Manage Orders
        </h2>
      </div>

      {/* Search */}
      <div className="mt-4 flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold text-green-700">
          Total Orders: {totalOrders}
        </h2>

        <input
          type="search"
          placeholder="Search by customer or product..."
          className="input input-bordered w-full bg-white focus:ring-2 focus:ring-green-400 md:w-80"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>

      {/* Fetching indicator */}
      {isFetching && !isLoading && (
        <p className="px-4 pt-3 text-sm text-green-600">Updating orders...</p>
      )}

      {/* Orders Table */}
      <div className="mt-4 overflow-x-auto p-4">
        <table className="table w-full overflow-hidden rounded border">
          <thead>
            <tr className="bg-black text-[15px] text-white">
              <th>S. No</th>
              <th>Customer Name</th>
              <th>Customer</th>
              <th>Product / Part</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>

          <tbody>
            {isLoading || isFetching ? (
              <ManageAllOrdersTableSkeleton />
            ) : isError ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-red-500">
                  {error?.message ||
                    "Something went wrong while fetching orders."}
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="ml-2 font-semibold underline"
                  >
                    Retry
                  </button>
                </td>
              </tr>
            ) : orderList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orderList.map((order, index) => (
                <ManageAllOrdersRow
                  key={order._id}
                  index={(currentPage - 1) * ITEMS_PER_PAGE + index}
                  order={order}
                  refetch={refetch}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* Pagination Information */}
      {!isLoading && !isError && totalOrders > 0 && (
        <p className="mb-4 text-center text-sm text-gray-500">
          Showing {orderList.length} of {totalOrders} orders
          {" | "}
          Page {currentPage} of {totalPages}
        </p>
      )}
    </section>
  );
};

export default ManageAllOrders;
