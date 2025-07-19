import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../Firebase/firebase.init";
import Loading from "../Shared/Loading";
import OrderDeleteModal from "./OrderDeleteModal";
import { BASE_URL } from "../../config";

const MyOrders = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  const [deleteOrder, setDeleteOrder] = useState(null);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["order", user?.email], () =>
    fetch(`${BASE_URL}/order?customer=${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/");
          toast.error("Access Token expire");
        }
        return res.json();
      })
  );
  // console.log(orders);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="border border-green-600 rounded mx-4">
      <div className="bg-green-600">
        <h2 className="text-white text-center p-1 text-2xl font-semibold">
          My Orders
        </h2>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="table w-full border rounded">
          <thead>
            <tr className="text-[17px] text-white">
              <th>S. No</th>
              <th>Product / Part</th>
              <th>Quantity</th>
              <th>Price/per</th>
              <th>Total Price</th>
              <th>Status/TXNId</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {orders?.map((o, index) => (
              <tr key={o?._id || index} className="text-[16px]">
                <th className="bg-white">{index + 1}</th>
                <td className="bg-white">{o?.productName}</td>
                <td className="bg-white">{o?.quantity}</td>
                <td className="bg-white">{o?.price}</td>
                <td className="bg-white">{o?.shouldPay}</td>
                <td className="bg-white">
                  {!o?.paid && (
                    <div
                      className="tooltip tooltip-info"
                      data-tip="Complete Payment"
                    >
                      <button
                        className="btn btn-info btn-sm text-white"
                        onClick={() => navigate(`/dashboard/payment/${o?._id}`)}
                      >
                        pay
                      </button>
                    </div>
                  )}
                  {o?.paid && (
                    <>
                      <p className="text-primary">Paid</p>
                      <div
                        className="tooltip tooltip-secondary"
                        data-tip="Transaction Id"
                      >
                        <p className="text-gray-700 font-semibold">
                          {o?.transactionId}
                        </p>
                      </div>
                    </>
                  )}
                </td>
                <td className="bg-white">
                  {!o?.paid ? (
                    <div
                      className="tooltip tooltip-error"
                      data-tip="Cancel This Order"
                    >
                      <button
                        className="btn btn-error btn-sm text-white"
                        onClick={() => setDeleteOrder(o)}
                      >
                        <FontAwesomeIcon className="mr-2" icon={faTrashAlt} />
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div
                      className="tooltip tooltip-primary"
                      data-tip="Can not cancel order after payment"
                    >
                      <p className="text-gray-700 font-semibold">Disabled</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteOrder && (
        <OrderDeleteModal
          deleteOrder={deleteOrder}
          setDeleteOrder={setDeleteOrder}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default MyOrders;
