import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import ManageAllOrdersRow from "./ManageAllOrdersRow";
import { BASE_URL } from "../../config";

const ManageAllOrders = () => {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(`${BASE_URL}/orders`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="border border-green-600 rounded mx-4">
      <div className="bg-green-600">
        <h2 className="text-white text-center p-1 text-2xl font-semibold">
          Manage Orders
        </h2>
      </div>
      <h2 className="text-center text-xl mt-3">
        Total Orders: {orders?.length}{" "}
      </h2>
      <div className="overflow-x-auto p-4">
        <table className="table w-full border rounded">
          <thead>
            <tr className="text-[17px] text-white">
              <th>S. No</th>
              <th>Customer Name</th>
              <th>Customer</th>
              <th>Product / Part</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <>
                <ManageAllOrdersRow
                  key={order._id}
                  index={index}
                  order={order}
                  refetch={refetch}
                ></ManageAllOrdersRow>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageAllOrders;
