import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../../../config";
import AdminPanel from "./AdminPanel";
import MakeAdminPanelTableSkeleton from "./MakeAdminPanelTableSkeleton";

const ITEMS_PER_PAGE = 10;
const SEARCH_DEBOUNCE = 400;

const MakeAdminPanel = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setCurrentPage(1);
    }, SEARCH_DEBOUNCE);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: users,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery(
    ["users", currentPage, ITEMS_PER_PAGE, debouncedSearch],
    () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
      });

      return fetch(`${BASE_URL}/users?${params.toString()}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        return res.json();
      });
    },
    {
      keepPreviousData: true,
    },
  );

  const userList = users?.data || [];
  const totalUsers = users?.meta?.total || 0;
  const totalPages = users?.meta?.totalPages || 0;

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <section className="border border-green-600 rounded mx-4">
      <div className="bg-green-600">
        <h2 className="text-white text-center p-1 text-2xl font-semibold">
          Manage Users
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-4 mt-4">
        <h2 className="text-xl font-semibold">Search: {totalUsers}</h2>

        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full md:max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto p-4">
        <table className="table w-full divide-y border border-slate-300">
          <thead>
            <tr className="text-[17px] text-white">
              <th>S. No</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Admin</th>
              <th className="text-center">Delete User</th>
            </tr>
          </thead>

          <tbody>
            {isLoading || isFetching ? (
              <MakeAdminPanelTableSkeleton />
            ) : isError ? (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  <p className="text-red-500 mb-2">Failed to load users.</p>
                  <button
                    onClick={() => refetch()}
                    className="btn btn-sm btn-primary text-white"
                  >
                    Retry
                  </button>
                </td>
              </tr>
            ) : userList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              userList.map((user, index) => (
                <AdminPanel
                  key={user._id}
                  index={(currentPage - 1) * ITEMS_PER_PAGE + index}
                  user={user}
                  refetch={refetch}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && !isLoading && !isError && (
        <div className="flex flex-wrap justify-center items-center gap-2 pb-5">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1 || isFetching}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`btn btn-sm ${
                currentPage === page ? "btn-primary text-white" : "btn-outline"
              }`}
              disabled={isFetching}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-sm"
            disabled={currentPage === totalPages || isFetching}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {!isLoading && !isError && totalUsers > 0 && (
        <p className="text-center text-sm text-gray-500 pb-4">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalUsers)} of {totalUsers}{" "}
          users
        </p>
      )}
    </section>
  );
};

export default MakeAdminPanel;
