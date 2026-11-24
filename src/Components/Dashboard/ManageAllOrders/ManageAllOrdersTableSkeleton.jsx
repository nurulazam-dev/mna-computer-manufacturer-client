import React from "react";

const ManageAllOrdersTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-4 py-4">
            <div className="h-4 w-7 rounded bg-gray-200" />
          </td>

          <td className="px-4 py-4">
            <div className="h-4 w-32 rounded bg-gray-200" />
          </td>

          <td className="px-4 py-4">
            <div className="h-4 w-36 rounded bg-gray-200" />
          </td>

          <td className="px-4 py-4">
            <div className="h-4 w-40 rounded bg-gray-200" />
          </td>

          <td className="px-4 py-4">
            <div className="h-5 w-16 rounded bg-gray-200" />
          </td>

          <td className="px-4 py-4">
            <div className="h-8 w-20 rounded bg-gray-200" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default ManageAllOrdersTableSkeleton;
